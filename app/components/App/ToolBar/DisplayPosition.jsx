import React from 'react';
import PropTypes from 'prop-types';

const DisplayPosition = (props) => {
  return (
    <h4 className="display-position two columns">
      {props.position}
    </h4>
  );
};

DisplayPosition.propTypes = {
  position: PropTypes.string.isRequired
};


export default DisplayPosition;