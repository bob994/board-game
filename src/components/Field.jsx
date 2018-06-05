import React from 'react';
import PropTypes from 'prop-types';

const Field = ({
  disabled, played, next, level, onFieldClick, x, y,
}) => {
  let className = 'field';

  if (disabled) className += ' disabled';
  else if (played) className += ' played';
  else if (next) className += ' next';
  else if (level) className += ' level';

  return (
    <div
      className={className}
      onClick={() => {
        if (next || className === 'field') onFieldClick(x, y);
      }}
      onKeyPress={() => {
        if (next || className === 'field') onFieldClick(x, y);
      }}
      role="presentation"
    />
  );
};

export default Field;

Field.propTypes = {
  disabled: PropTypes.bool.isRequired,
  played: PropTypes.bool.isRequired,
  next: PropTypes.bool.isRequired,
  level: PropTypes.bool.isRequired,
  onFieldClick: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

