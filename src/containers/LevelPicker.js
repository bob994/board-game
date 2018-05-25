import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playLevel } from '../actions';

class LevelPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLevel: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.playLevel = this.playLevel.bind(this);
  }

  playLevel() {
    this.props.playLevel(this.state.selectedLevel);
    this.props.history.push('/game');
  }

  handleChange(event) {
    this.setState({ selectedLevel: parseInt(event.target.value) });
  }

  render() {
    const levels = [];
    for (let i = 0; i < this.props.lastLevel; i++) {
      levels.push(
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      );
    }

    return (
      <div>
        <h1 className="text-center">Nine9</h1>
        <div className="form-group">
          <label>Level</label>
          <select
            className="form-control"
            value={this.state.selectedLevel}
            onChange={this.handleChange}
          >
            {levels}
          </select>
          <button className="btn btn-primary" onClick={this.playLevel}>
            Play
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lastLevel: state.game.lastLevel
  };
}

export default connect(mapStateToProps, { playLevel })(LevelPicker);
