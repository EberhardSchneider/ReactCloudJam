import 'skeleton-css-webpack';
import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/App.jsx';
import Store from '../store/store.js';

const store = new Store();

ReactDOM.render(<App store={store}/>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}