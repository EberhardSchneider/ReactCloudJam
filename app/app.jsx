import 'skeleton-css-webpack';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.jsx';
import Store from './store/store.jsx';

const store = new Store();

ReactDOM.render(<App/>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}