import React from 'react';
import PropTypes from 'prop-types';

import storeProvider from '../storeProvider';

import PlayStop from './ToolBar/PlayStop';
import DisplayPosition from './ToolBar/DisplayPosition';



const ToolBar = (props) => {

  return (
    <div className="row">
      <PlayStop/>
      <DisplayPosition/>
    </div>
  );
};


export default ToolBar;