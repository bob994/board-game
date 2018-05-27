import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playLevel, selectPlayer, createPlayer } from '../actions';

import Swal from 'sweetalert2';

class LevelPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLevel: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.playLevel = this.playLevel.bind(this);
    this.choosePlayer = this.choosePlayer.bind(this);
  }

  playLevel() {
    this.props.playLevel(this.state.selectedLevel, this.state.user);
    this.props.history.push('/game');
  }

  handleChange(event) {
    this.setState({ selectedLevel: parseInt(event.target.value) });
  }

  choosePlayer(event) {
    event.preventDefault();

    Swal({
      title: 'Choose player',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "Let's play!",
      html: `<select value="${
        this.props.selectedPlayer
      }" class="swal2-input swal2-select" id="users">${this.renderPlayerList()}</select>
            </br>Or add new</br> 
            <input class="swal2-input" id="newUser" />`,
      focusConfirm: false,
      preConfirm: () => {
        const users = document.getElementById('users').options;
        const newUser = document.getElementById('newUser').value;

        if (newUser !== '') {
          for (let i = 0; i < users.length; i++) {
            if (users[i].text === newUser) return false;
          }

          this.props.createPlayer(newUser);
          return newUser;
        }

        return document.getElementById('users').value;
      }
    }).then(username => this.props.selectPlayer(username.value));
  }

  renderPlayerList() {
    const players = this.props.players;
    let result = '';

    Object.keys(players).map((key, index) => {
      if (key === this.props.selectedPlayer)
        result += `<option selected value=${key}>${key}</option>`;
      else result += `<option value=${key}>${key}</option>`;
    });

    return result;
  }

  render() {
    const levels = [];
    const lastLevel = this.props.stats.lastLevel;

    for (let i = 1; i <= lastLevel + 1; i++) {
      levels.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return (
      <div>
        <div>
          <a className="btn btn-link" href="#" onClick={this.choosePlayer}>
            Choose player
          </a>
        </div>
        <h1 className="text-center">Nine9</h1>
        <div className="form-group">
          <label>Level</label>
          <select
            className="form-control"
            value={this.state.selectedLevel}
            onChange={this.handleChange}
          >
            {levels}
          </select>
          <button className="btn btn-primary" onClick={this.playLevel}>
            Play
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { players, selectedPlayer } = state.game;
  return {
    players,
    selectedPlayer,
    stats: players[selectedPlayer]
  };
}

export default connect(mapStateToProps, {
  playLevel,
  selectPlayer,
  createPlayer
})(LevelPicker);
