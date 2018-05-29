import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playTurn, levelCompleted, levelFailed } from '../actions';
import {
  initializeArray,
  findNextFields,
  generateLevel,
  disableFields
} from '../helpers/fields_helper';
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
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
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

  playTurn(fields, field) {
    field.played = true;

    fields.forEach(row => {
      row.forEach(cell => {
        cell.next = false;
      });
    });

    const nextFields = findNextFields(fields, field);

    if (nextFields.length === 0 && this.props.fieldsLeftToClick > 1) {
      Swal({
        title: 'Oops!',
        text: 'You lose!',
        type: 'warning'
      }).then(() => {
        this.props.levelFailed();
        this.props.history.push('/');
      });
    }
  }

  onFieldClick(x, y) {
    // Create Deep Clone
    const fields = this.state.fields.map(row => {
      const newRow = row.map(field => {
        return Object.assign({}, field);
      });

      return newRow;
    });

    const field = fields[x][y];

    if (!this.state.levelGenerated) {
      field.played = true;
      field.level = true;

      const level = generateLevel(fields, field, this.props.level);

      if (level.length === this.props.level) {
        disableFields(fields);
        findNextFields(fields, field);

        this.setState({ levelGenerated: true, fields });
        this.timerInterval = setInterval(this.tick, 1000);
        this.props.playTurn();
      } else {
        field.played = false;
        field.level = false;

        Swal({
          title: 'Hmmm!',
          text: "Can't generate level starting on this field!",
          type: 'warning'
        });
      }
    } else {
      this.playTurn(fields, field);
      this.setState({ fields });
      this.props.playTurn();
    }
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
