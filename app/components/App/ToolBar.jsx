import React from 'react';


import PlayStop from './ToolBar/PlayStop';
import DisplayPosition from './ToolBar/DisplayPosition';



const ToolBar = () => {

  return (
    <div className="row">
      <PlayStop/>
      <DisplayPosition/>
    </div>
  );
};


export default ToolBar;