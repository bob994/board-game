import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateLevel } from '../actions';
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

  generate(x, y) {
    const fields = initializeArray();
    fields[x][y].current = true;
    console.log(this.rec(fields, fields[x][y], this.props.level));
    this.props.generateLevel(fields);
  }

  onFieldClick(x, y) {
    if (!this.state.levelGenerated) {
      this.generate(x, y);
    }
  }

  rec(fields, firstField, level) {
    if (level == 0) return [];

    const { x, y } = firstField;
    let af = this.availableField(fields, x, y);

    let arr = [];

    do {
      if (af.length === 0) {
        firstField.active = false;
        return [];
      }
      arr = [];
      const r = af[Math.floor(Math.random() * af.length)];
      af.splice(af.indexOf(r), 1);
      r.active = true;
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
        if (x - 3 == i && y == j && !arr[i][j].current && !arr[i][j].active) {
          result.push(arr[i][j]);
        }

        if (x + 3 == i && y == j && !arr[i][j].current && !arr[i][j].active) {
          result.push(arr[i][j]);
        }

        if (y - 3 == j && x == i && !arr[i][j].current && !arr[i][j].active) {
          result.push(arr[i][j]);
        }

        if (y + 3 == j && x == i && !arr[i][j].current && !arr[i][j].active) {
          result.push(arr[i][j]);
        }

        if (
          x - 2 == i &&
          y - 2 == j &&
          !arr[i][j].current &&
          !arr[i][j].active
        ) {
          result.push(arr[i][j]);
        }

        if (
          x - 2 == i &&
          y + 2 == j &&
          !arr[i][j].current &&
          !arr[i][j].active
        ) {
          result.push(arr[i][j]);
        }

        if (
          x + 2 == i &&
          y - 2 == j &&
          !arr[i][j].current &&
          !arr[i][j].active
        ) {
          result.push(arr[i][j]);
        }

        if (
          x + 2 == i &&
          y + 2 == j &&
          !arr[i][j].current &&
          !arr[i][j].active
        ) {
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

export default connect(mapStateToProps, { generateLevel })(Game);
