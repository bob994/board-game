import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playTurn, levelCompleted, levelFailed } from '../actions';
import { initializeArray, findLevelFields, findNextFields } from '../helpers';
import Swal from 'sweetalert2';

import Board from '../components/Board';
import Stats from '../components/Stats';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: initializeArray(),
      levelGenerated: false,
      timer: 0
    };

    this.tick = this.tick.bind(this);
    this.onFieldClick = this.onFieldClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.fieldsLeftToClick == 0) {
      clearInterval(this.timerInterval);

      Swal({
        title: 'Well done!',
        text: `You finished level ${this.props.level}. Continue on next level?`,
        type: 'success',
        backdrop: 'linear-gradient(0deg, #4b6cb7 0%, #182848 100%)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonText: 'Yes, go on!',
        cancelButtonText: 'No, get me back on level picker.'
      }).then(result => {
        if (result.value) {
          this.props.levelCompleted(this.state.timer);
          this.setState({
            fields: initializeArray(),
            levelGenerated: false,
            timer: 0
          });
        } else {
          this.props.levelCompleted(this.state.timer);
          this.props.history.push('/');
        }
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  generateLevel(fields, field) {
    field.played = true;
    field.level = true;
    this.rec(fields, field, this.props.level);

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (!fields[i][j].level) fields[i][j].disabled = true;
      }
    }

    const nextFields = findNextFields(fields, field);

    for (let i = 0; i < nextFields.length; i++) {
      fields[nextFields[i].x][nextFields[i].y].next = true;
    }

    this.setState({ levelGenerated: true });
  }

  playTurn(fields, field) {
    field.played = true;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (fields[i][j].next) fields[i][j].next = false;
      }
    }

    const nextFields = findNextFields(fields, field);

    if (nextFields.length === 0 && this.props.fieldsLeftToClick > 1) {
      Swal({
        title: 'Oops!',
        text: 'You lose!',
        type: 'warning',
        backdrop: 'linear-gradient(0deg, #4b6cb7 0%, #182848 100%)'
      }).then(() => {
        this.props.levelFailed();
        this.props.history.push('/');
      });
    }

    for (let i = 0; i < nextFields.length; i++) {
      fields[nextFields[i].x][nextFields[i].y].next = true;
    }
  }

  onFieldClick(x, y) {
    const fields = this.state.fields.map(row => Object.assign({}, row));
    const field = fields[x][y];

    if (!this.state.levelGenerated) {
      this.generateLevel(fields, field);
      this.timerInterval = setInterval(this.tick, 1000);
    } else {
      this.playTurn(fields, field);
    }

    this.props.playTurn();
  }

  rec(fields, firstField, level) {
    if (level == 0) return [];

    const { x, y } = firstField;
    let af = findLevelFields(fields, fields[x][y]);

    let arr = [];

    do {
      if (af.length === 0) {
        firstField.level = false;
        return [];
      }
      arr = [];
      const r = af[Math.floor(Math.random() * af.length)];
      af.splice(af.indexOf(r), 1);
      r.level = true;
      const next = this.rec(fields, r, level - 1);
      // if (next.length == 0 && level > 1) r.active = false;
      arr = [r, ...next];
    } while (arr.length != level);

    return arr;
  }

  tick() {
    this.setState({
      timer: ++this.state.timer
    });
  }

  render() {
    return (
      <div className="game">
        <Stats
          lives={this.props.lives}
          level={this.props.level}
          fieldsLeftToClick={this.props.fieldsLeftToClick}
          timer={this.state.timer}
        />
        <Board fields={this.state.fields} onFieldClick={this.onFieldClick} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedPlayer, players } = state.game;
  return {
    lives: players[selectedPlayer].lives,
    level: players[selectedPlayer].level,
    fieldsLeftToClick: players[selectedPlayer].fieldsLeftToClick,
    lastLevel: players[selectedPlayer].lastLevel
  };
}

export default connect(mapStateToProps, {
  playTurn,
  levelCompleted,
  levelFailed
})(Game);
