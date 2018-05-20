import React, { Component } from 'react';

import Board from '../components/Board';
import Stats from '../components/Stats';

class Game extends Component {
  render() {
    return (
      <div className="game">
        <Board />
        <Stats />
      </div>
    );
  }
}

export default Game;
