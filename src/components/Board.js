import React, { Component } from 'react';

import Field from './Field';

class Board extends Component {
  renderFields() {
    const fieldsComponents = [];
    const fields = this.props.fields;

    for (let i = 0; i < fields.length; i++) {
      for (let j = 0; j < 10; j++) {
        fieldsComponents.push(
          <Field
            key={i + '_' + j}
            {...fields[i][j]}
            onFieldClick={(x, y) => this.props.onFieldClick(x, y)}
          />
        );
      }
    }

    return fieldsComponents;
  }

  render() {
    return <div className="board">{this.renderFields()}</div>;
  }
}

export default Board;
