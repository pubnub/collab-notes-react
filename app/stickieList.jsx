import React from 'react';
import ReactDOM from 'react-dom';
import Stickie from './stickie';
import 'webfontloader'

require('webfontloader').load({
  google: {
    families: ['Give You Glory']
  }
});

// React Animation Add-on
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


export default class StickieList extends React.Component {

  render() {
    let items = (this.props.stickieList || []).map((item) => 
      <li key={item.username + '-' + item.timestamp} >
        <div className="stickieWrapper">
          <Stickie text={item.text} color={item.color} username={item.username}/>
        </div>
      </li>);

    return (
      <ReactCSSTransitionGroup transitionName='animation' component='ul' id="stickiesList">
        {items}
      </ReactCSSTransitionGroup>  
    )
  }

}
