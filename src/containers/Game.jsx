import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { playTurn, levelCompleted, levelFailed } from '../actions';
import {
  initializeArray,
  findNextFields,
  // generateLevel,
  disableFields,
} from '../helpers/fields_helper';
import Worker from '../workers/generate.worker';

import Board from '../components/Board';
import Stats from '../components/Stats';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: initializeArray(),
      levelGenerated: false,
      timer: 0,
    };

    this.tick = this.tick.bind(this);
    this.onFieldClick = this.onFieldClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.fieldsLeftToClick === 0) {
      clearInterval(this.timerInterval);

      Swal({
        title: 'Well done!',
        text: `You finished level ${this.props.level}. Continue on next level?`,
        type: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.props.levelCompleted(this.state.timer);
          this.setState({
            fields: initializeArray(),
            levelGenerated: false,
            timer: 0,
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

  onFieldClick(x, y) {
    // Create Deep Clone
    const fields = this.state.fields.map((row) => {
      const newRow = row.map(field => Object.assign({}, field));

      return newRow;
    });

    const field = fields[x][y];

    if (!this.state.levelGenerated) {
      field.played = true;
      field.level = true;

      const worker = new Worker();
      worker.postMessage({ fields, field, level: this.props.level });
      // const level = generateLevel(fields, field, this.props.level);
      worker.onmessage = (event) => {
        this.handleWorker(event.data.fields, field, event.data.level);
      };

      Swal({
        title: 'Level generating',
        text: 'Please wait',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
    } else {
      this.playTurn(fields, field);
      this.setState({ fields });
      this.props.playTurn();
    }
  }

  handleWorker(fields, field, level) {
    Swal.close();

    if (level.length === this.props.level) {
      disableFields(fields);
      findNextFields(fields, field);

      this.setState({ levelGenerated: true, fields });
      this.timerInterval = setInterval(this.tick, 1000);
      this.props.playTurn();
    } else {
      const currentField = field;
      currentField.played = false;
      currentField.level = false;

      Swal({
        title: 'Hmmm!',
        text: "Can't generate level starting on this field!",
        type: 'warning',
      });
    }
  }

  playTurn(fields, field) {
    const currentField = field;
    currentField.played = true;

    fields.forEach((row) => {
      row.forEach((cell) => {
        const currentCell = cell;
        currentCell.next = false;
      });
    });

    const nextFields = findNextFields(fields, currentField);

    if (nextFields.length === 0 && this.props.fieldsLeftToClick > 1) {
      Swal({
        title: 'Oops!',
        text: 'You lose!',
        type: 'warning',
      }).then(() => {
        this.props.levelFailed();
        this.props.history.push('/');
      });
    }
  }

  tick() {
    this.setState({
      timer: this.state.timer += 1,
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
  };
}

export default connect(mapStateToProps, {
  playTurn,
  levelCompleted,
  levelFailed,
})(Game);

Game.propTypes = {
  lives: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  fieldsLeftToClick: PropTypes.number.isRequired,
  playTurn: PropTypes.func.isRequired,
  levelCompleted: PropTypes.func.isRequired,
  levelFailed: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
