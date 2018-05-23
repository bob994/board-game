import React, { Component } from 'react';

import Field from './Field';

class Board extends Component {
  constructor(props) {
    super(props);

    this.onFieldClick = this.onFieldClick.bind(this);
  }

  onFieldClick(x, y) {
    this.props.onFieldClick(x, y);
  }

  renderFields() {
    const fieldsComponent = [];
    const fields = this.props.fields;

    for (let i = 0; i < fields.length; i++) {
      for (let j = 0; j < 10; j++) {
        fieldsComponent.push(
          <Field
            key={i + '_' + j}
            {...fields[i][j]}
            onFieldClick={this.onFieldClick}
          />
        );
      }
    }

    return fieldsComponent;
  }

  render() {
    return <div className="board">{this.renderFields()}</div>;
  }
}

export default Board;
