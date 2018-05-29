import React, { Component } from 'react';

class Field extends Component {
  render() {
    const { disabled, played, next, level } = this.props;
    let className = 'field';

    if (disabled) className += ' disabled';
    else if (played) className += ' played';
    else if (next) className += ' next';
    else if (level) className += ' level';

    return (
      <div
        className={className}
        onClick={() => {
          if (next || className === 'field') this.props.onFieldClick(this.props.x, this.props.y);
        }}
      />
    );
  }
}

export default Field;
