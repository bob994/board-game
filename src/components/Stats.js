import React, { Component } from 'react';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      timer: ++this.state.timer
    });
  }

  render() {
    const { fieldsLeftToClick, lives, level } = this.props;

    return (
      <div className="stats">
        <div className="stat">
          Timer: <b>{this.state.timer}</b>
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
