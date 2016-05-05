'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import StickieList from './stickieList';
import UserList from './userList';
import 'pubnub';

var username = (localStorage.getItem('username')) ? (localStorage.getItem('username')) : window.prompt('Your name');
username = (!username) ? 'anonymous-' + ~~(Math.random() * 10000) : username;
localStorage.setItem('username', username);

const colors = ['yellow', 'pink', 'green', 'blue', 'purple'];
var color = (localStorage.getItem('color')) ? (localStorage.getItem('color')) : colors[~~(Math.random() * colors.length)];
localStorage.setItem('color', color);

/* PubNub */

// Sign up and get your own API keys at https://pubnub.com 
const publish_key =  'pub-c-1d17120d-f60e-437a-b7c4-b89f773629cb';
const subscribe_key  = 'sub-c-85bdcc70-067d-11e6-996b-0619f8945a4f';

const pubnub = require('pubnub').init({                         
  publish_key   : publish_key,
  subscribe_key : subscribe_key,
  ssl: true,
  uuid: username
});

const channel = 'stickie-notes';


class CollabStickies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stickieList: [],
      userList: []
    }
  }

  componentWillMount() {
    pubnub.subscribe({
      channel: channel,
      restore: true,
      connect: () => this.connect(),
      message: (m) => this.success(m),
      presence: (m) => this.presenceChanged(m)
    });
  }

   // set state with the user data and send it to PubNub
  componentDidMount() {
    var userdata = {username: this.props.username, color: this.props.color, timestamp: Date.now()};
    pubnub.state({
      channel: channel,
      uuid: this.props.username,
      state: userdata
    });
  }

  // grab data from PubNub History API when PubNub is connected for the first time
  connect() { 
    pubnub.history({
      channel: channel,
      count: 50,
      callback: (m) => {
        m[0].reverse();
        for (var v of m[0]) {
          let newList = this.state.stickieList.concat(v);
          this.setState({stickieList: newList});
        }
      }
    });
  }

  // At the success callback, update the stickie note list
  success(m) { 
    let newList = [m].concat(this.state.stickieList);
    this.setState({stickieList: newList});
  }

  // Watch if metadata is attached when m.action == 'state-change' or 'timeout'. 
  // Also 'join' at the first time after a user enter a name
  presenceChanged(m) {
    if(m.data) { 
      console.log(m);
      pubnub.here_now({
        channel: channel,
        callback: (m) => this.getUserList(m)
      });
    }
  }

  getUserList(m) {
    this.state.userList.length = 0;

    var i = 0;
    for (var u of m.uuids) { // ES6 for-of loop
      
      pubnub.state({ //get state
        channel: channel,
        uuid: u,
        callback: (s) => {
          if(!s.username) return; // To ignore the debug console
          
          let newList = this.state.userList.concat({username: s.username, color: s.color, timestamp: s.timestamp});
          
          if(i == m.uuids.length)
          this.setState({userList: newList});
        }
      });
      i++;
    }
  }

  render() {
    return (
      <div>
        <UserList userList={this.state.userList} />
        <StickieWritable username={this.props.username} color={this.props.color} />
        <StickieList stickieList={this.state.stickieList} />
      </div>
    );
  }
}

var StickieWritable = React.createClass({

  handleTextChange: function(e) {
    if(e.keyCode != 13) return;
    if(e.target.value == '') return;
    if(e.target.value == '\n') {
      e.target.value = '';
      return;
    }

    var data = {
      username: this.props.username,
      color: this.props.color,
      text: e.target.value,
      timestamp: Date.now()
    }

    pubnub.publish({
      channel: channel, 
      message: data, 
      callback: e.target.value = ''
    });
  },

  render: function() {
    return (
      <div className={'stickie-note writable ' + this.props.color}>
        <textarea type='text' placeholder='Your new note...' onKeyUp={this.handleTextChange} />
        <p className='username'>{this.props.username}</p>
      </div>  
    );
  }

});


/* DOM */

ReactDOM.render(
  <CollabStickies username={username} color={color} />,
  document.getElementById('container')
);

