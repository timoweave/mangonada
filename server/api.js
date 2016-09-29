/* eslint-disable */
const express = require('express');
const request = require('request-promise');

const router = express.Router();

router.param('userName', (req, res, next, userLabel) => {
  req.user = userLabel;
  next();
});

router.param('repoName', (req, res, next, repoLabel) => {
  req.repo = repoLabel;
  next();
});

router.param('endpoint', (req, res, next, endpointLabel) => {
  req.endpoint = endpointLabel;
  next();
});

router.route('/repos/:userName/:repoName')
.all((req, res, next) => {
  next();
})
.get((req, res) => {
  const gitURL = `https://api.github.com/repos/${req.user}/${req.repo}`;
  const branchesURL = `${gitURL}/branches`;
  const commitsURL = `${gitURL}/commits`;
  const userAgent = 'cadeban';
  const secrets = 'client_id=423335fdf206466ccd3b&client_secret=bc10a999efc0335d06b6d84d470b76eda5a97b30';
  const branchOpt = { uri: `${branchesURL}?${secrets}`, headers: { 'User-Agent': userAgent } };

  /**
   * Requests list of all branches associated with a repository,
   * then requests all commits from each branch using Github API.
   */
  request(branchOpt)
  .then((branches) => {
    branches = JSON.parse(branches);
    const requestBranchCommits = [];
    branches.forEach((branch) => {
      requestBranchCommits.push(makeRequestBranchCommits(branch.commit.sha, []));
    });
    Promise.all(requestBranchCommits).then((allCommits) => {
      const requestAllCommits = { commits: [], lookup: {} };
      const allFlattenCommits = [].concat(...allCommits);

      /**
       * Sorts array of commits by timestamp
       */
      allFlattenCommits.sort((lhs, rhs) => Date.parse(lhs.commit.committer.date) - Date.parse(rhs.commit.committer.date));

      /**
       * Filters array of commits to remove duplicates
       */
      allFlattenCommits.reduce((container, branchCommit) => {
        if (container.lookup[branchCommit.sha] === undefined) {
          container.lookup[branchCommit.sha] = true;
          container.commits.push(branchCommit);
        }
        return container;
      }, requestAllCommits);

      res.status(200).json({
        JSONBranches: branches,
        JSONCommits: requestAllCommits.commits
      });
    }, () => {
      res.status(401).end('noooooo');
    });

    /**
     * [makeRequestBranchCommits gets a branches' commits from github's api in quantities of 100,
     * if there are more commits to be retrieved,
     * run getNextCommits again until there are no more commits to retrieve]
     * @param  {[String]} lastSha [Sha # of most recent commit on the branch]
     * @return {[Promise]} [Returns a promise that contains a recursive invocation to Github Api]
     */
    function makeRequestBranchCommits(branchLastSha) {
      return new Promise((resolve, reject) => {
        function getNextCommits(lastSha, commitArr = []) {
          const commitsOpt = { uri: `${commitsURL}?sha=${lastSha}&per_page=100&${secrets}`,
          headers: { 'User-Agent': userAgent } };
          request(commitsOpt).then((commits) => {
            const commitObjs = JSON.parse(commits);
            commitArr.push(...commitObjs);
            if (commitObjs.length < 100 || commitObjs[commitObjs.length - 1].parents.length === 0) {
              resolve(commitArr);
              return;
            }
            getNextCommits(commitObjs[commitObjs.length - 1].sha, commitArr);
          });
        }
        getNextCommits(branchLastSha, []);
      });
    }
  });
});

module.exports = router;
