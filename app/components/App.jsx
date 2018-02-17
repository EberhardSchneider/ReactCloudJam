import React from 'react';
import PropTypes from 'prop-types';

import '../public/stylesheets/main.css';

import ToolBar from './App/ToolBar';
import Pattern from './App/Pattern';



class App extends React.Component {
  constructor(props) {
    super(props);
  }


  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext() {
    return {
      store: this.props.store
    };
  }

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