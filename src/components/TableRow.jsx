import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.setState({ opened: !this.state.opened });
  }

  render() {
    const sortedScores = this.props.scores.sort((a, b) => b - a);
    const otherScores = sortedScores.map((score, i) => {
      if (i > 0) {
        return (
          <div key={`${score}_${score}`}>
            {score} seconds
            <br />
          </div>
        );
      }
      return null;
    });

    let thing;

    if (otherScores.length > 1 && this.state.opened) {
      thing = <span className="scoreTimeMinus">&#x2212;</span>;
    } else if (otherScores.length > 1 && !this.state.opened) {
      thing = <span className="scoreTimePlus">&#43;</span>;
    }

    return (
      <tr className="table-light">
        <td>Level {this.props.level}</td>
        <td
          className="text-center scoreTime"
          onClick={this.handleOnClick}
          onKeyPress={this.handleOnClick}
          role="presentation"
        >
          {Math.max(...this.props.scores)} seconds{' '}
          {thing}
          {this.state.opened ? otherScores : ''}
        </td>
        <td className="text-right">{this.props.scores.length}</td>
      </tr >
    );
  }
}

export default TableRow;

TableRow.propTypes = {
  scores: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  level: PropTypes.number.isRequired,
};
