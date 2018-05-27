import React, { Component } from 'react';
import { connect } from 'react-redux';

class TopScore extends Component {
  renderRows() {
    const scores = this.props.scores;
    const result = [];
    let i = scores.length - 1;

    while (result.length < 10 && i >= 0) {
      result.push(
        <tr key={i}>
          <td>Level {i + 1}</td>
          <td>{Math.max(...scores[i])} seconds</td>
          <td>{scores[i].length}</td>
        </tr>
      );
      i--;
    }

    return result;
  }

  render() {
    return (
      <div>
        <h1>Top Score</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Level</th>
              <th>Time</th>
              <th>Times completed</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { players, selectedPlayer } = state.game;
  return {
    scores: players[selectedPlayer].topScore
  };
}

export default connect(mapStateToProps)(TopScore);
