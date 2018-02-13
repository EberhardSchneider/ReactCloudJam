import React from 'react';
import PropTypes from 'prop-types';


import ToolBar from './App/ToolBar.jsx';
import Pattern from './App/Pattern.jsx';


class App extends React.Component {
  render() {
    return (
      <div>
        <ToolBar/>
        <Pattern/>
      </div>

    );
  }
}

export default App;