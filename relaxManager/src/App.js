import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { Tooltip } from 'antd';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { getUser } from './utils/storage'
import {useDispatch,useSelector} from 'react-redux'
import { getAdminInfo,initAdmin } from './redux/feature/adminSlice';
import { Game ,GameRelease, Customers,Sign } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => { 
  const dispatch = useDispatch();
  const admin = useSelector(getAdminInfo)
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    dispatch(initAdmin(getUser()))
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        { !admin.token? 
        <Routes>
          <Route path="/" element={(<Sign />)} />
        </Routes>
        : (<div className="flex max-w-[100vw] justify-between relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <Tooltip
              color={currentColor}
              title="theme settings"
              placement="top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </Tooltip>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg pl-72 bg-main-bg min-h-screen w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div className="w-full">
              {themeSettings && (<ThemeSettings />)}
              <Routes>
                <Route path="/" element={(<Game />)} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/game" element={<Game />} />
                <Route path="/gameRelease" element={<GameRelease />} />
              </Routes>
            </div>
            <Footer />
          </div>
            </div>)
        }
       
      </BrowserRouter>
    </div>
  );
};

export default App;
