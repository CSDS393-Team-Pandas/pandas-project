import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <App />
      </ContextProvider>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
