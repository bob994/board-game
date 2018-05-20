import React, { Component } from 'react';

class Stats extends Component {
  render() {
    return (
      <div className="stats">
        <div className="stat">
          Timer: <b>12s </b>
        </div>
        <div className="stat">
          Left to click: <b>22</b>
        </div>
        <div className="stat">
          Lives: <b>10</b>
        </div>
        <div className="stat">
          Level: <b>66</b>
        </div>
      </div>
    );
  }
}

export default Stats;
