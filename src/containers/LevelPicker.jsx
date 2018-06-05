import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { playLevel, selectPlayer, createPlayer } from '../actions';
import config from '../config/config';

class LevelPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLevel: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.playLevel = this.playLevel.bind(this);
    this.choosePlayer = this.choosePlayer.bind(this);
  }

  componentDidMount() {
    this.onMount();
  }

  onMount() {
    this.setState({ selectedLevel: this.props.stats.lastLevel + 1 });
  }

  playLevel() {
    this.props.playLevel(this.state.selectedLevel, this.state.user);
    this.props.history.push('/game');
  }

  handleChange(event) {
    this.setState({ selectedLevel: parseInt(event.target.value, 10) });
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
          for (let i = 0; i < users.length; i += 1) {
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
      },
    });
  }

  renderPlayerList() {
    const { players } = this.props;
    let result = '';

    Object.keys(players).forEach((key) => {
      if (key === this.props.selectedPlayer) {
        result += `<option selected value=${key}>${key}</option>`;
      } else result += `<option value=${key}>${key}</option>`;
    });

    return result;
  }

  render() {
    const levels = [];
    const { lastLevel } = this.props.stats;

    for (let i = 1; i <= lastLevel + 1; i += 1) {
      if (i >= config.StartingLevel) {
        levels.push(<option key={i} value={i}>{i}</option>);
      }
    }

    return (
      <div className="container level-picker d-flex flex-column justify-content-center">
        <div className="level-picker__header p-2 d-flex justify-content-between align-items-center">
          <div className="">
            <img className="heart" src="../../img/heart.svg" alt="Lives" />
            {this.props.stats.lives}
          </div>
          <button onClick={this.choosePlayer} className="btn btn-link">
            Choose player
          </button>
        </div>
        <div className="align-self-center mt-3 mt-lg-5">
          <img src="../../img/logo.png" alt="Logo" />
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
          <Link className="col-12 text-center mt-2" href="/topscore" to="/topscore">
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
    stats: players[selectedPlayer],
  };
}

export default connect(mapStateToProps, {
  playLevel,
  selectPlayer,
  createPlayer,
})(LevelPicker);

LevelPicker.propTypes = {
  players: PropTypes.objectOf(PropTypes.shape({
    lives: PropTypes.any,
    lastLevel: PropTypes.any,
    level: PropTypes.any,
    fieldToClick: PropTypes.any,
    topScore: PropTypes.array,
  })).isRequired,
  selectedPlayer: PropTypes.string.isRequired,
  stats: PropTypes.shape({
    lives: PropTypes.any,
    lastLevel: PropTypes.any,
    level: PropTypes.any,
    fieldToClick: PropTypes.any,
    topScore: PropTypes.array,
  }).isRequired,
  playLevel: PropTypes.func.isRequired,
  selectPlayer: PropTypes.func.isRequired,
  createPlayer: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
