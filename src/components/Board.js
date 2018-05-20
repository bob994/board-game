import React, { Component } from 'react';

import Field from './Field';

class Board extends Component {
  constructor(props) {
    super(props);
  }

  renderFiedls() {
    const fields = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        fields.push(<Field key={i + '_' + j} />);
      }
    }

    return fields;
  }

  render() {
    return <div className="board">{this.renderFiedls()}</div>;
  }
}

export default Board;
