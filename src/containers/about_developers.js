/* eslint-disable */
import React, { Component } from 'react';
import Paper from 'material-ui/Paper/Paper';
// import Paper from 'material-ui/Paper';

class AboutDevelopers extends Component {

  constructor(props) {
    super(props);
    this.style = {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block'
    };
    this.developers = [
      {
        github : "arnav-aggarwal",
        name : "Arnav Aggarwal",
        img : "/img/arnav.jpg"
      },
      {
        github : "martinkwan",
        name : "Martin Kwan",
        img : "/img/martin.jpg"
      },
      {
        github : "cadeban",
        name : "Cadence Banulis",
        img : "/img/cady.jpg"
      },
      {
        github : "timoweave",
        name : "Timothy Shiu",
        img: "/img/tim.jpg"
      }
    ];
    this.getDevelopers = this.getDevelopers.bind(this);
  }

  render() {
    console.log("hello about");
    return (
        <div >
            <div class="container" style="margin:0em 2em;">
                <h1>About us</h1>
                
                <div class="row" style="margin-bottom: 2em;">

                    Git is a powerful tool and has a place in every
                    modern software engineering project. Good git
                    practices are vital to a fast and productive
                    workflow. Despite its importance, there aren’t
                    many good tools for analyzing your git
                    workflow. That’s why we decided to
                    create <a href="http://github.com/mangonada/mangonada">
                    Git Central.</a>
                </div>
                <div class="row" style="margin-bottom: 2em;">
                    The Git Central team has four amazing and
                    talent members committed to deliver best user
                    experience. We are all passionate about web
                    development using the lastest cutting edge
                    technology, paradigms, tools, designs to
                    empower user experience at a lightning speed.

                </div>
                
                <div class="row"> 
                    
                    <div class="col-xs-7 col-sm-3 col-md-3" >
                        <img src="/img/arnav.jpg"
                             style="width:100%;border-radius:50%;">
                        <div style="font-size:0.8em;">Arnav Aggarwal</div>
                        <div>
                            <a href="github.com/arnav-aggarwal">
                                <img src="/img/github.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="linkedin.com/in/arnavaggarwal">
                                <img src="/img/linkedin.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="facebook.com/" class="disable-anchor">
                                <img src="/img/facebook.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="twitter.com/" class="disable-anchor">
                                <img src="/img/twitter.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="mailto:" class="disable-anchor">
                                <img src="/img/email.png"
                                     style="width:1em;"/>
                            </a>
                        </div>
                    </div>

                    <div class="col-xs-7 col-sm-3 col-md-3">
                        
                        <img src="/img/cady.jpg"
                             style="width:100%;border-radius:50%;">
                        <div style="font-size:0.8em;">Cadence Banulis</div>
                        <div>
                            <a href="github.com/cadeban">
                                <img src="/img/github.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="linkedin.com/in/cadence-banulis-18b234123">
                                <img src="/img/linkedin.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="facebook.com/" class="disable-anchor">
                                <img src="/img/facebook.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="twitter.com/" class="disable-anchor">
                                <img src="/img/twitter.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="mailto:" class="disable-anchor">
                                <img src="/img/email.png"
                                     style="width:1em;"/>
                            </a>
                        </div>
                    </div>

                    <div class="col-xs-7 col-sm-3 col-md-3">
                        <img src="/img/martin.jpg"
                             style="width:100%;border-radius:50%;">
                        <div style="font-size:0.8em;">Martin Kwan</div>
                        <div>
                            <a href="github.com/martinkwan">
                                <img src="/img/github.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="linkedin.com/in/mkkwan">
                                <img src="/img/linkedin.png"
                                     style="width:1em;" />
                            </a>
                            <a href="facebook.com/" class="disable-anchor">
                                <img src="/img/facebook.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="twitter.com/" class="disable-anchor">
                                <img src="/img/twitter.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="mailto:" class="disable-anchor">
                                <img src="/img/email.png"
                                     style="width:1em;"/>
                            </a>
                        </div>
                    </div>

                    <div class="col-xs-7 col-sm-3 col-md-3">
                        <img src="/img/tim.jpg"
                             style="width:100%;border-radius:50%;">
                        <div style="font-size:0.8em;"> Timothy Shiu </div>
                        <div>
                            <a href="github.com/timoweave">
                                <img src="/img/github.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="linkedin.com/in/tlinkedin">
                                <img src="/img/linkedin.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="facebook.com/timoshiu"  class="disable-anchor">
                                <img src="/img/facebook.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="twitter.com/#timoshiu"  class="disable-anchor">
                                <img src="/img/twitter.png"
                                     style="width:1em;"/>
                            </a>
                            <a href="mailto:timoweave@gmail.com" class="disable-anchor">
                                <img src="/img/email.png"
                                     style="width:1em;"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default AboutDevelopers;
