import React from 'react';
import PropTypes from 'prop-types';

import ToggleButton from './ToggleButton.jsx';

const PlayButton = () => {
  return (
    <ToggleButton
      text={'PLAY'}/>
  );
};

PlayButton.propTypes = {
  clickHandler: PropTypes.func.isRequired
};

export default PlayButton;