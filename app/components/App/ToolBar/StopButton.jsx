import React from 'react';
import PropTypes from 'prop-types';

const StopButton = (props) => {
  return (
    <button
      className="primary-button two columns"
      id="stop-button"
      onClick={props.clickHandler}>
      Stop
    </button>
  );
};

StopButton.propTypes = {
  clickHandler: PropTypes.func.isRequired
};

export default StopButton;