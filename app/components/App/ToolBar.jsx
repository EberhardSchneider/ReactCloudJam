import React from 'react';
import PropTypes from 'prop-types';

import PlayButton from './ToolBar/PlayButton.jsx';
import StopButton from './ToolBar/StopButton.jsx';
import DisplayPosition from './ToolBar/DisplayPosition.jsx';



const ToolBar = (props) => {
  return (
    <div className="row">
      <PlayButton/>
      <StopButton/>
      <DisplayPosition position={'2.4'}/>
    </div>
  );
};

export default ToolBar;