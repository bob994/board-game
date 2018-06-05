import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TableRow from '../components/TableRow';

class TopScore extends Component {
  renderRows() {
    const { scores } = this.props;
    const result = [];
    let i = scores.length - 1;

    while (result.length < 10 && i >= 0) {
      if (scores[i] !== null) {
        result.push(<TableRow key={i} level={i + 1} scores={scores[i]} />);
      }
      i -= 1;
    }

    return result;
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-2 d-flex justify-content-between align-items-center">
          <h1 className="col-6 text-custom">Top Score</h1>
          <div className="col-6 text-right">
            <Link href="/" to="/" className="btn btn-custom">
              Back
            </Link>
          </div>
        </div>
        <table className="table mt-2">
          <thead>
            <tr className="table-light">
              <th>Level</th>
              <th className="text-center">Time</th>
              <th className="text-right">Times completed</th>
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
    scores: players[selectedPlayer].topScore,
  };
}

export default connect(mapStateToProps)(TopScore);

TopScore.propTypes = {
  scores: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};
