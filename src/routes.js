import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import RepoDisplay from './containers/repo_display';

class AppWrapper extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
export default (
  <Route path="/" component={AppWrapper}>
    <IndexRoute component={App}/>
    <Route path=":user/:repo" component={App}/>
  </Route>  
);
