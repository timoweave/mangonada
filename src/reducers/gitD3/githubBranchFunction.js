/* eslint-disable */
export default class GithubApiInterface {
  constructor(JSONCommits, JSONBranches) {
    this.JSONCommits = JSONCommits;
    this.JSONBranches = JSONBranches;
    this.SHALookup = {};
    this.branchLookup = {};
    this.branchLengths = {};

    // initialization
    this.setupShaLookup();
    this.setupBranchLookup();
    this.addChildren();
    this.addBranchName();

    // json obj transformation
    this.addOrphanBranch();
  }
  /**
   * Set up table to look up commit objects by sha
   * Initialize children array on each commit object
   */
  setupShaLookup() {
    this.JSONCommits.forEach(commit => this.SHALookup[commit.sha] = commit);
  }

  //Iterate through each commit to link children and parents
  addChildren() {
    this.JSONCommits.forEach(commit => commit.children = []);
    this.JSONCommits.forEach(commit => {
      commit.parents.forEach(parent => {
        const parentCommit = this.SHALookup[parent.sha];
        if (parentCommit !== undefined) {
            parentCommit.children.push(commit.sha);
        }
      });
    });
  }

  getCommit(sha){
    return this.SHALookup[sha];
  }

  setupBranchLookup(){
    this.JSONBranches.forEach(branch => this.branchLookup[branch.name] = branch);
  }

  getParentShas(commit) {
    return commit.parents.map(parent => parent.sha);
  }

  /**
   * Iterate through each branch that is not master, and name branches
   */
   addBranchName() {
    const branches = this.JSONBranches.filter((b) => { return (b.name !== "master"); });

    const sortedBranches = branches.map((branch) => {
      const length = this.visitParents(this.SHALookup[branch.commit.sha], () => 1);
      return { sha: branch.commit.sha, name: branch.name, length: length };
    }).sort((branchA, branchB) => {
      return branchA.length - branchB.length;
    });
    sortedBranches.forEach((branch) => {
      const commit = this.branchLookup[branch.sha];
      this.nameMainBranch(commit);
    });

    const masterBranch = this.JSONBranches.filter((b) => { return (b.name === "master"); })[0];
    this.nameMainBranch(masterBranch);

    // rename orphan branches
    this.JSONCommits.filter(this.filter2Parents)
        .map(this.setOrphanName);

    this.JSONBranches = sortedBranches;
  }

  setOrphanName(commit) {
    if ((commit.children.length > 1) || (commit.parents.lenght > 1)) {
      return;
    }
  }

  visitParents(commit, cb){
    if (commit === undefined) return 0;
    let val = cb(commit);
    if (!commit.parents || !commit.parents.length) { return val; }
    val += this.visitParents(this.SHALookup[commit.parents[0].sha], cb);
    return val;
  }

  /**
   * Assign branch property to each commit object
   * name: name of current branch
   * sha: sha of current commit
   */
  nameMainBranch({ name, commit: { sha } }) {

    const commit = this.SHALookup[sha];
    const nameParentBranchName = (commitObj) => {
      if (commitObj !== undefined) {
        commitObj.branch = name;
        commitObj.parents.forEach( (parent, index) => {
          if (index !== 0) { return ; }
          nameParentBranchName(this.SHALookup[parent.sha]);
        });
      }
    }
    nameParentBranchName(commit);
  }

  nameBranch({ name, commit: { sha } }) {
    const commit = this.SHALookup[sha];

    const checkBranchName = (commitObj) => {
      if (commitObj !== undefined){
        commitObj.branch = name;
        commitObj.parents.forEach(parent => checkBranchName(this.SHALookup[parent.sha]));
      }
    };

    checkBranchName(commit);
  }

  /**
   * Return commit objects with more than one parent
   * [Filter function]
   */
  filter2Parents(JSONCommitObj) {
    return JSONCommitObj.parents.length > 1;
  }

  /**
   * Return the parent at index 1
   * [Map function]
   */
  getRightParent(JSONCommitObj) {
    if(JSONCommitObj === undefined) { return undefined; }
    return this.SHALookup[JSONCommitObj.parents[1].sha];
  }

  /**
   * Rename Orphan branches
   * [Map function]
   */
  urlParser(url, replacementSha){
    let splitUrl = url.split('/');
    splitUrl[splitUrl.length - 1] = replacementSha;
    return splitUrl.join('/');
  }

  renameOrphanParent(JSONCommitObj) {
    const rightParentCommitObj = this.getRightParent(JSONCommitObj);
    if (rightParentCommitObj.branch) { return; }
    // if (rightParentCommitObj.children.length > 1) { return; }
    if (rightParentCommitObj === undefined) { return; }
    if (rightParentCommitObj.branch !== undefined) { return; /* already labeled */}

    const orphanBranchName = JSONCommitObj.branch + "[" + rightParentCommitObj.sha.slice(0, 5) + "]";
    this.JSONBranches[rightParentCommitObj.sha] = { name : orphanBranchName,
                                                    commit : { sha : rightParentCommitObj.sha,
                                                               'url': this.urlParser(rightParentCommitObj.commit.url, rightParentCommitObj.sha),} };
    rightParentCommitObj.branch =  orphanBranchName;

    const checkOrphan = (commitObj, branchName) => {
      if (commitObj === undefined) { return; }
      if (commitObj.children.length > 1) { return; }
      commitObj.branch = branchName;
      if (commitObj.parents.length > 0) {
        checkOrphan(this.SHALookup[commitObj.parents[0].sha], branchName);
      }
    }
    const leftParent = this.SHALookup[rightParentCommitObj.parents[0].sha];
    checkOrphan(leftParent, orphanBranchName);
  }

  findChildrenBranchName(ans, kid) {
    const kidCommit =  this.SHALookup[kid];
    if (kidCommit && kidCommit.parents.includes(kid)) {
      return kidCommit;
    } else {
      return ans;
    }
  }

  /**
   * Alter JSONCommits object to have Orphan branch names
   */
  addOrphanBranch() {
    this.JSONCommits
        .filter(this.filter2Parents)
        .map(this.renameOrphanParent.bind(this));
  }

  /**
   * Adds gitCommands property to commit and assigns universal git commands
   */
   addGitCommands(){
     this.JSONCommits.forEach(commit => this.analyzeCommit(commit));
   }

  /**
   * [addTailCommands] Adds possible git commands for most recent branch nodes
   * to git menu
   * [params] commit, list of commands
   * [return value] modified commit
   */
    addTailCommands(commit, ...commands) {
       commands.forEach(command => commit.gitCommands += ('\n ' + command));
      return commit;
    }

    // addLineBreak(message, tempMessage = ''){
    //   let line = [];
    //   message.split(' ').forEach((word, i) => {
    //     line.push(word);
    //     if (i % 5 === 0){
    //       tempMessage += `\n${line.join(' ')}`;
    //       line = [];
    //     }
    //   });
    //   return tempMessage;
    // }

}
