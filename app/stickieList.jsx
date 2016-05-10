import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Stickie from './stickie';
import webfontloader from 'webfontloader'

webfontloader.load({
  google: {
    families: ['Give You Glory']
  }
});

export default class StickieList extends React.Component {

  render() {
    let items = (this.props.stickieList || []).map((item) => 
      <li key={item.username + '-' + item.timestamp} >
        <div className="stickieWrapper">
          <Stickie text={item.text} color={item.color} username={item.username}/>
        </div>
      </li>);

    return (
      <ReactCSSTransitionGroup transitionName='animation' transitionEnterTimeout={500} transitionLeaveTimeout={500} component='ul' id="stickiesList">
        {items}
      </ReactCSSTransitionGroup>  
    )
  }

}
