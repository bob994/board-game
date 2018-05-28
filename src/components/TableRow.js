import React, { Component } from 'react';

class TableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
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
          <div key={i}>
            {score} seconds
            <br />
          </div>
        );
      }
    });

    return (
      <tr className="table-light">
        <td>Level {this.props.level}</td>
        <td className="text-center scoreTime" onClick={this.handleOnClick}>
          {Math.max(...this.props.scores)} seconds{' '}
          {otherScores.length > 1 ? (
            this.state.opened ? (
              <span className="scoreTimeMinus">&#x2212;</span>
            ) : (
              <span className="scoreTimePlus">&#43;</span>
            )
          ) : (
            ''
          )}
          {this.state.opened ? otherScores : ''}
        </td>
        <td className="text-right">{this.props.scores.length}</td>
      </tr>
    );
  }
}

export default TableRow;
