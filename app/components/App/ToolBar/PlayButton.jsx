import React from 'react';
import PropTypes from 'prop-types';

const PlayButton = (props) => {
  return (
    <button
      className="primary-button two columns"
      id="play-button"
      onClick={props.clickHandler}>
      Play
    </button>
  );
};

PlayButton.propTypes = {
  clickHandler: PropTypes.func.isRequired
};

export default PlayButton;