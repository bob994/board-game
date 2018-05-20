import React, { Component } from 'react';

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false
    };
  }
  render() {
    return <div className="field" />;
  }
}

export default Field;
