import React from 'react';
import PropTypes from 'prop-types';

const Stats = ({
  fieldsLeftToClick, lives, level, timer,
}) => (
  <div className="stats">
    <div className="stat">
      Timer: <b>{timer}</b>
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

export default Stats;

Stats.propTypes = {
  fieldsLeftToClick: PropTypes.number.isRequired,
  lives: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
};

