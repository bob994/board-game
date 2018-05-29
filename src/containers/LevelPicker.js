import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { playLevel, selectPlayer, createPlayer } from '../actions';
import config from '../config/config';
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

  componentDidMount() {
    this.setState({ selectedLevel: this.props.stats.lastLevel + 1 });
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
            <input class="swal2-input" id="newUser" />
            </br><p class="d-none text-danger sweet-alert">User with same name already exist.</p>`,
      focusConfirm: false,
      preConfirm: () => {
        const users = document.getElementById('users').options;
        const newUser = document.getElementById('newUser').value;

        if (newUser !== '') {
          for (let i = 0; i < users.length; i++) {
            if (users[i].text === newUser) {
              document.getElementsByClassName('sweet-alert')[0].classList.remove('d-none');
              return false;
            }
          }

          this.props.createPlayer(newUser);
          return true;
        }

        this.props.selectPlayer(document.getElementById('users').value);
        return true;
      }
    });
  }

  renderPlayerList() {
    const { players } = this.props;
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
    const { lastLevel } = this.props.stats;

    for (let i = 1; i <= lastLevel + 1; i++) {
      if (i >= config.StartingLevel) {
        levels.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
    }

    return (
      <div className="container level-picker d-flex flex-column justify-content-center">
        <div className="level-picker__header p-2 d-flex justify-content-between align-items-center">
          <div className="">
            <img className="heart" src="../../img/heart.svg" />
            {this.props.stats.lives}
          </div>
          <a href="#" onClick={this.choosePlayer}>
            Choose player
          </a>
        </div>
        <div className="align-self-center mt-3 mt-lg-5">
          <img src="../../img/logo.png" />
        </div>
        <div className="row justify-content-center">
          <h3 className="col-12 text-center mt-2 mt-lg-5 mb-4 mb-lg-5">
            Welcome {this.props.selectedPlayer}! Choose level and start your game!
          </h3>
          <div className="col-12 col-lg-4 input-group">
            <select
              className="form-control"
              value={this.state.selectedLevel}
              onChange={this.handleChange}
            >
              {levels}
            </select>
            <div className="input-group-append">
              <button className="btn btn-custom" onClick={this.playLevel}>
                Play
              </button>
            </div>
          </div>
          <Link className="col-12 text-center mt-2" to="/topscore">
            Top Score
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ game }) {
  const { players, selectedPlayer } = game;

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
