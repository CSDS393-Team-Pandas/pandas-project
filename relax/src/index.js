import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LuisoProvider from './Context/LuisoProvider';
import store from './redux/store'
import { Provider } from 'react-redux'
import { RouterProvider,createBrowserRouter,redirect }  from 'react-router-dom'
import Sign from './pages/Sign';
import { getToken } from './utils/storage';
import UserInfo from './pages/UserInfo';
import GamePage from './pages/GamePage';
import GameDetail from './pages/GameDetail';

const router = createBrowserRouter([{
  path: '/',
  element: <App/>,
  children: [
    {
      path: '/',
      element: <GamePage/>
    },
    {
      path: 'sign',
      element: <Sign/>
    },
    {
      path: 'user',
      element: <UserInfo/>,
      loader: () => {
        if (!getToken()) {
          throw redirect("/sign");
        }
      }
    },
    {
      path: 'gameDetail',
      element: <GameDetail/>
    }
  ]
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LuisoProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </LuisoProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
