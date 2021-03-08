import React from 'react';
import ReactDOM from 'react-dom';

import { UseWalletProvider } from 'use-wallet'


import App from './App';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div id="content">
    <UseWalletProvider chainId={1}>
      <App title={title} />
    </UseWalletProvider>
  </div>,
  document.getElementById('app')
);

module.hot.accept();
