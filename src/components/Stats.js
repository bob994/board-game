import React, { Component } from 'react';

class Stats extends Component {
  render() {
    const { fieldsLeftToClick, lives, level, timer } = this.props;

    return (
      <div className="stats">
        <div className="stat">
          Timer: <b>{timer}</b>
        </div>
        <div className="stat">
          Left to click: <b>{fieldsLeftToClick}</b>
        </div>
        <div className="stat">
          Lives: <b>{lives}</b>
        </div>
        <div className="stat">
          Level: <b>{level}</b>
        </div>
      </div>
    );
  }
}

export default Stats;
