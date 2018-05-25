import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  generateLevel,
  playTurn,
  levelCompleted,
  levelFailed
} from '../actions';
import { initializeArray } from '../helpers';

import Board from '../components/Board';
import Stats from '../components/Stats';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelGenerated: false
    };

    this.onFieldClick = this.onFieldClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.fieldsLeftToClick == 0) {
      this.setState({ levelGenerated: false });
      this.props.levelCompleted();
    }
  }

  generate(x, y) {
    const fields = initializeArray();
    fields[x][y].played = true;
    fields[x][y].level = true;
    console.log(this.rec(fields, fields[x][y], this.props.level));

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (!fields[i][j].level) fields[i][j].disabled = true;
      }
    }

    const nextFields = this.availableNextField(fields, x, y);

    for (let i = 0; i < nextFields.length; i++) {
      fields[nextFields[i].x][nextFields[i].y].next = true;
    }

    this.props.generateLevel(fields);
  }

  onFieldClick(x, y) {
    if (!this.state.levelGenerated) {
      this.generate(x, y);
      this.setState({ levelGenerated: true });
    } else {
      const fields = this.props.fields;
      const field = fields[x][y];
      field.played = true;

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (fields[i][j].next) fields[i][j].next = false;
        }
      }

      const nextFields = this.availableNextField(fields, x, y);
      console.log(nextFields);

      if (nextFields.length === 0 && this.props.fieldsLeftToClick > 1) {
        console.log('Failed');
        this.props.levelFailed();
      }

      for (let i = 0; i < nextFields.length; i++) {
        fields[nextFields[i].x][nextFields[i].y].next = true;
      }
      this.props.playTurn(fields);
    }
  }

  rec(fields, firstField, level) {
    if (level == 0) return [];

    const { x, y } = firstField;
    let af = this.availableField(fields, x, y);

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

  availableField(arr, x, y) {
    let result = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (x - 3 == i && y == j && !arr[i][j].level) {
          result.push(arr[i][j]);
        }

        if (x + 3 == i && y == j && !arr[i][j].level) {
          result.push(arr[i][j]);
        }

        if (y - 3 == j && x == i && !arr[i][j].level) {
          result.push(arr[i][j]);
        }

        if (y + 3 == j && x == i && !arr[i][j].level) {
          result.push(arr[i][j]);
        }

        if (x - 2 == i && y - 2 == j && !arr[i][j].level) {
          result.push(arr[i][j]);
        }

        if (x - 2 == i && y + 2 == j && !arr[i][j].level) {
          result.push(arr[i][j]);
        }

        if (x + 2 == i && y - 2 == j && !arr[i][j].level) {
          result.push(arr[i][j]);
        }

        if (x + 2 == i && y + 2 == j && !arr[i][j].level) {
          result.push(arr[i][j]);
        }
      }
    }

    return result;
  }

  availableNextField(arr, x, y) {
    let result = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (x - 3 == i && y == j && arr[i][j].level && !arr[i][j].played) {
          result.push(arr[i][j]);
        }

        if (x + 3 == i && y == j && arr[i][j].level && !arr[i][j].played) {
          result.push(arr[i][j]);
        }

        if (y - 3 == j && x == i && arr[i][j].level && !arr[i][j].played) {
          result.push(arr[i][j]);
        }

        if (y + 3 == j && x == i && arr[i][j].level && !arr[i][j].played) {
          result.push(arr[i][j]);
        }

        if (x - 2 == i && y - 2 == j && arr[i][j].level && !arr[i][j].played) {
          result.push(arr[i][j]);
        }

        if (x - 2 == i && y + 2 == j && arr[i][j].level && !arr[i][j].played) {
          result.push(arr[i][j]);
        }

        if (x + 2 == i && y - 2 == j && arr[i][j].level && !arr[i][j].played) {
          result.push(arr[i][j]);
        }

        if (x + 2 == i && y + 2 == j && arr[i][j].level && !arr[i][j].played) {
          result.push(arr[i][j]);
        }
      }
    }

    return result;
  }

  render() {
    return (
      <div className="game">
        <Board fields={this.props.fields} onFieldClick={this.onFieldClick} />
        <Stats
          lives={this.props.lives}
          level={this.props.level}
          fieldsLeftToClick={this.props.fieldsLeftToClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lives: state.game.lives,
    level: state.game.level,
    fieldsLeftToClick: state.game.fieldsLeftToClick,
    fields: state.game.fields
  };
}

export default connect(mapStateToProps, {
  generateLevel,
  playTurn,
  levelCompleted,
  levelFailed
})(Game);
