import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import App from '../src/components/App';

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('container')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('../src/components/App', () => {
    const NextApp = require('../src/components/App').default; // eslint-disable-line global-require
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('container')
    );
  });
}