
import React from 'react';
import ReactDOM from 'react-dom';

export default class UserList extends React.Component {

  render() {
    return (
      <section className="userlist-container">
      <ul id="userList">
        {this.props.userList.map((item) => 
          <li key={item.username} className={item.color} title={item.username}><p>{item.username}</p></li>)}
      </ul>
      </section>
    )
  }

}
