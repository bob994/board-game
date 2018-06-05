import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from './Field';

class Board extends Component {
  renderFields() {
    const fieldsComponents = [];
    const { fields } = this.props;

    for (let i = 0; i < fields.length; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        fieldsComponents.push(<Field
          key={`${i}_${j}`}
          {...fields[i][j]}
          onFieldClick={(x, y) => this.props.onFieldClick(x, y)}
        />);
      }
    }

    return fieldsComponents;
  }

  render() {
    return <div className="board">{this.renderFields()}</div>;
  }
}

export default Board;

Board.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.objectOf(
    PropTypes.number,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.bool,
    PropTypes.bool,
    PropTypes.bool,
  ))).isRequired,
  onFieldClick: PropTypes.func.isRequired,
};

