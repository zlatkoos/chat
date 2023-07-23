import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";
import { Scrollbars } from 'react-custom-scrollbars';
import UserSetup from './UserSetup';

class App extends Component {
  state = {
    messages: [],
    member: {
      username: '',
      color: '#09d3ac',
    },
    isUserSetup: false,
    joiningChat: false,
  }

  constructor() {
    super();
    this.drone = null;
  }

  handleUserSetup = ({ username, color }) => {
    if (this.state.joiningChat) {
      return;
    }

    this.setState({ joiningChat: true });

    this.drone = new window.Scaledrone("5my0l4pzIiEThbz9", {
      data: { username, color }
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = { username, color };
      member.id = this.drone.clientId;
      this.setState({ member, isUserSetup: true, joiningChat: false });
    });
    const room = this.drone.subscribe("observable-soba1");
    room.on('data', (data, member) => {
      const messages = [...this.state.messages];
      messages.push({
        member,
        text: data,
        timestamp: Date.now() // Add the timestamp property when pushing the message
      });
      this.setState({ messages });
    });
  }



  render() {
    const { isUserSetup, joiningChat } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="headline-text">Chat aplikacija</h1>
        </div>
        {isUserSetup ? (
          <>
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              style={{ height: "calc(100% - 60px)", width: "100%" }}
              renderThumbVertical={({ style, ...props }) => (
                <div {...props} style={{ ...style, backgroundColor: "#09d3ac" }} />
              )}
              renderThumbHorizontal={({ style, ...props }) => (
                <div {...props} style={{ ...style, backgroundColor: "#09d3ac" }} />
              )}
            >
              <Messages
                messages={this.state.messages}
                currentMember={this.state.member}
              />
            </Scrollbars>
            <Input
              onSendMessage={this.onSendMessage}
            />
          </>
        ) : (
          <UserSetup
            onUserSetup={this.handleUserSetup}
            disabled={joiningChat}
          />
        )}
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-soba1",
      message
    });
  }
}

export default App;
