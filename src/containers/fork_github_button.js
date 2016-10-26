import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton/FloatingActionButton';
import IconButton from 'material-ui/IconButton/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {blue500, red500, greenA200} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 24,
};

export default class ForkGithubButton extends Component {
  render() {

    return (
     <IconButton iconClassName="muidocs-icon-custom-github" className="fab-fork-github"/>
    );

    return (
    <FloatingActionButton
      className="fab-fork-github"
      secondary={false}
      href="http://github.com/mangonada/mangonada" >
     <ContentAdd />
    </FloatingActionButton>
    );

    return (
    <FloatingActionButton
      className="fab-fork-github"
      secondary={false}
      href="http://github.com/mangonada/mangonada" >
     <IconButton iconClassName="muidocs-icon-custom-github" />
     <ContentAdd />
    </FloatingActionButton>
    );


    return (
    <FloatingActionButton
      className="fab-fork-github"
      href="http://github.com/mangonada/mangonada"
      iconClassName="muidocs-icon-custom-github" >
    </FloatingActionButton>
    );

  }
}
