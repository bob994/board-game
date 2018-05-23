import React, { Component } from 'react';

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false
    };
  }
  render() {
    let className = 'field';
    if (this.props.disabled) className += ' disabled';
    else if (this.props.current) className += ' current';
    else if (this.props.active) className += ' active';

    return (
      <div
        className={className}
        onClick={() => this.props.onFieldClick(this.props.x, this.props.y)}
      />
    );
  }
}

export default Field;
