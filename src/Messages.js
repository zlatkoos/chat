import React, { Component, createRef } from "react";
import { Scrollbars } from "react-custom-scrollbars";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.scrollbarsRef = createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    if (this.scrollbarsRef.current) {
      this.scrollbarsRef.current.scrollToBottom();
    }
  }

  render() {
    const { messages } = this.props;
    return (
      <Scrollbars
        ref={this.scrollbarsRef}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        style={{ height: "100%", width: "100%" }}
        renderThumbVertical={({ style, ...props }) => (
          <div {...props} style={{ ...style, backgroundColor: "#09d3ac" }} />
        )}
        renderThumbHorizontal={({ style, ...props }) => (
          <div {...props} style={{ ...style, backgroundColor: "#09d3ac" }} />
        )}
      >
        <ul className="Messages-list">
          {messages.map((message, index) => this.renderMessage(message, index))}
        </ul>
      </Scrollbars>
    );
  }

  renderMessage(message, index) {
    const { member, text, timestamp } = message;
    const { currentMember } = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    const senderName = messageFromMe
      ? member.clientData.username
      : capitalizeFirstLetter(member.clientData.username);

    const formattedTimestamp = formatTimestamp(timestamp); // Format the timestamp

    return (
      <li key={index} className={className}>
        <span
          className="avatar"
          style={{ backgroundColor: member.clientData.color }}
        />
        <div className="Message-content">
          <div className="username">
            <strong>{senderName}</strong>
          </div>
          <div className="text">{text}</div>
          <div className="timestamp">{formattedTimestamp}</div> {/* Display the timestamp */}
        </div>
      </li>
    );
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default Messages;
