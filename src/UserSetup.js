import React, { Component } from 'react';
import './UserSetup.css';

const predefinedNames = [
  'Ana', 'Ivan', 'Marko', 'Petra', 'Marta',
  'Luka', 'Marina', 'Josip', 'Nina', 'Toni',
  'Ema', 'Filip', 'Lana', 'Bruno', 'Mia',
  'Leo', 'Laura', 'Ante', 'Elena', 'Ivano'
];

class UserSetup extends Component {
  state = {
    username: '',
    color: '#09d3ac',
  };

  handleNameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handleColorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  handleRandomJoin = () => {
    const randomName = predefinedNames[Math.floor(Math.random() * predefinedNames.length)];
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    this.setState({ username: randomName, color: randomColor });
  };

  handleJoinChat = () => {
    const { username, color } = this.state;
    if (username.trim() !== '' && /^#[0-9A-F]{6}$/i.test(color)) {
      this.props.onUserSetup({ username, color });
    }
  };

  render() {
    const { username, color } = this.state;
    return (
      <div className="user-setup">
        <input
          type="text"
          value={username}
          onChange={this.handleNameChange}
          placeholder="Upišite svoje ime"
        />
        <button onClick={this.handleRandomJoin}>
          Generiraj automatski
        </button>
        <label htmlFor="favcolor" className="color-picker-label">Odaberite boju: </label>
        <input
          type="color"
          value={color}
          id="favcolor"
          name="favcolor"
          onChange={this.handleColorChange}
        />
        <button disabled={username.trim() === '' || !/^#[0-9A-F]{6}$/i.test(color)} onClick={this.handleJoinChat}>
          Pridruži se dopisivanju!
        </button>

      </div>
    );
  }
}

export default UserSetup;
