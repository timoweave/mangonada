////////////////////////////////////////////////////////////////
/// models, schema  
var config = require('./config');
var chalk = require('chalk');
var mongoose = require('mongoose');
var q = require('q');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

mongoose.Promise = q.Promise; // NOTE: original mongoose.mpromise is deprecated

var UserSchema = Schema({
  username: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var GithubDataSchema = Schema({
  id : String, // "user/repo"
  repo : { // status
    id : { type : String, required : false },
    name : { type : String, required : false },
    full_name : { type : String, required : false },
    owner : {
      login : { type : String, required : false },
      id : { type : String, required : false },
      avatar_url : { type : String, required : false },
      url : { type : String, required : false },
      html_url : { type : String, required : false },
      followers_url : { type : String, required : false },
      following_url : { type : String, required : false },
      gists_url : { type : String, required : false },
      starred_url : { type : String, required : false },
      subscriptions_url : { type : String, required : false },
      organizations_url : { type : String, required : false },
      repos_url : { type : String, required : false },
      events_url : { type : String, required : false },
      received_events_url : { type : String, required : false },
      type : { type : String, required : false },
      site_admin : { type : Boolean, required : false }
    }, // repo.owner
    "private" : { type : Boolean, required : false },
    html_url : { type : String, required : false },
    description : { type : String, required : false },
    fork : { type : Boolean, required : false },
    url : { type : String, required : false },
    forks_url : { type : String, required : false },
    keys_url : { type : String, required : false },
    collaborators_url : { type : String, required : false },
    teams_url : { type : String, required : false },
    hooks_url : { type : String, required : false },
    issue_comment_url : { type : String, required : false },
    events_url : { type : String, required : false },
    assignees_url : { type : String, required : false },
    branches_url : { type : String, required : false },
    tags_url : { type : String, required : false },
    blobs_url : { type : String, required : false },
    git_tags_url : { type : String, required : false },
    git_refs_url : { type : String, required : false },
    trees_url : { type : String, required : false },
    statuses_url : { type : String, required : false },
    languages_url : { type : String, required : false },
    stargazers_url : { type : String, required : false },
    contributors_url : { type : String, required : false },
    subscribers_url : { type : String, required : false },
    subscription_url : { type : String, required : false },
    commits_url : { type : String, required : false },
    git_commits_url : { type : String, required : false },
    comments_url : { type : String, required : false },
    issue_comment_url : { type : String, required : false },
    contents_url : { type : String, required : false },
    compare_url : { type : String, required : false },
    merges_url : { type : String, required : false },
    archive_url : { type : String, required : false },
    downloads_url : { type : String, required : false },
    issues_url : { type : String, required : false },
    pulls_url : { type : String, required : false },
    milestones_url : { type : String, required : false },
    notifications_url : { type : String, required : false },
    labels_url : { type : String, required : false },
    releases_url : { type : String, required : false },
    deployments_url : { type : String, required : false },
    created_at : { type : String, required : false },
    updated_at : { type : String, required : false },
    pushed_at : { type : String, required : false },
    git_url : { type : String, required : false },
    ssh_url : { type : String, required : false },
    clone_url : { type : String, required : false },
    svn_url : { type : String, required : false },
    homepage : { type : String, required : false },
    size : { type : Number, required : false },
    stargazers_count : { type : Number, required : false },
    watchers_count : { type : Number, required : false },
    language : { type : String, required : false },
    has_issues : { type : Boolean, required : false },
    has_downloads : { type : Boolean, required : false },
    has_wiki : { type : Boolean, required : false },
    has_pages : { type : Boolean, required : false },
    forks_count : { type : Number, required : false },
    mirror_url : { type : String, required : false },
    open_issues_count : { type : Number, required : false },
    forks : { type : Number, required : false },
    open_issues : { type : Number, required : false },
    watchers : { type : Number, required : false },
    default_branch : { type : String, required : false },
    organization : {
      login : { type : String, required : false },
      id : { type : Number, required : false },
      avatar_url : { type : String, required : false },
      gravatar_id : { type : String, required : false },
      url : { type : String, required : false },
      html_url : { type : String, required : false },
      followers_url : { type : String, required : false },
      following_url : { type : String, required : false },
      gists_url : { type : String, required : false },
      starred_url : { type : String, required : false },
      subscriptions_url : { type : String, required : false },
      organizations_url : { type : String, required : false },
      repos_url : { type : String, required : false },
      events_url : { type : String, required : false },
      received_events_url : { type : String, required : false },
      type : { type : String, required : false },
      site_admin : { type : Boolean, required : false }
    }, // repo.organization
    network_count: { type : Number, required : false },
    subscribers_count: { type : Number, required : false }
  }, // repo
  branches : [ {
    name : { type : String, required : false },
    commit : {
      sha : { type : String, required : false },
      url : { type : String, required : false }
    } // commit
  } ],
  commits : [ {
    sha : { type : String, required : false },
    commit : {
      author : {
        name : { type : String, required : false },
        email : { type : String, required : false },
        date : { type : String, required : false }
      }, // author
      committer : {
        name : { type : String, required : false },
        email : { type : String, required : false },
        date : { type : String, required : false }
      }, // commiter
      message : { type : String, required : false },
      tree : {
        sha : { type : String, required : false },
        url : { type : String, required : false }
      }, // tree
      url : { type : String, required : false },
      comment_count : { type : Number, required : false }
    }, // commit
    url : { type : String, required : false },
    html_url : { type : String, required : false },
    comments_url : { type : String, required : false },
    author : {
      login : { type : String, required : false },
      id : { type : Number, required : false },
      avator_url : { type : String, required : false },
      gavator_id : { type : String, required : false },
      url : { type : String, required : false },
      html_url : { type : String, required : false },
      followers_url : { type : String, required : false },
      following_url : { type : String, required : false },
      gists_url : { type : String, required : false },
      starred_url : { type : String, required : false },
      subscriptions_url : { type : String, required : false },
      organizations_url : { type : String, required : false },
      repos_url : { type : String, required : false },
      events_url : { type : String, required : false },
      received_events_url : { type : String, required : false },
      type : { type : String, required : false },
      site_admin : { type : Boolean, required : false }
    }, // author
    committer : {
      login : { type : String, required : false },
      id : { type : Number, required : false },
      avator_url : { type : String, required : false },
      gavator_id : { type : String, required : false },
      url : { type : String, required : false },
      html_url : { type : String, required : false },
      followers_url : { type : String, required : false },
      following_url : { type : String, required : false },
      gists_url : { type : String, required : false },
      starred_url : { type : String, required : false },
      subscriptions_url : { type : String, required : false },
      organizations_url : { type : String, required : false },
      repos_url : { type : String, required : false },
      events_url : { type : String, required : false },
      received_events_url : { type : String, required : false },
      type : { type : String, required : false },
      site_admin : { type : Boolean, required : false }
    }, // committer
    parents : [ {
      sha : { type : String, required : false },
      url : { type : String, required : false },
      html_url : { type : String, required : false }
    } ]
  } ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var userSequence = require('mongoose-sequence');
UserSchema.plugin(userSequence, { 'inc_field': 'userId' });

var models = {
  User : mongoose.model('User', UserSchema),
  GithubData : mongoose.model('GithubData', GithubDataSchema),
};

crudify_models();
module.exports = models;// new Promise(crudify_models).then((models) => { return Promise.resolve( models)});;

// functions

function crudify_models() {

  mongoose.connection.on('connected', connected);
  mongoose.connection.on('disconnected', disconnected);
  mongoose.connection.on('error', error);
  mongoose.connection.once('open', ready);
  var db = mongoose.connect(config.mongoose.mlab);
  var mlab = chalk.blue(config.mongoose.mlab);

  function ready() {
    console.log("mongoose ready!");
  }

  function connected() {
    console.log(chalk.green('OK'), chalk.yellow('connected'), 'mongoose server', mlab);
  }

  function disconnected() {
    console.log(chalk.green('OK'), chalk.yellow('disconnected'), 'mongoose server', mlab);
  }

  function error() {
    console.log(chalk.red('NO'), chalk.yellow('error'), 'mongoose server', mlab);
  }
}


