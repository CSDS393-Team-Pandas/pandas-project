import './App.css';
import { useLuisoContext } from './Context/LuisoProvider';
import { Outlet } from 'react-router-dom'
import React,{useEffect} from 'react';
import { getToken } from './utils/storage';
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from './redux/features/userSlice';
function App() {
  const dispatch = useDispatch();
  const { theme } = useLuisoContext();
  useEffect(() => {
    getToken() && dispatch(fetchUserInfo())
  },[])
  return (
    <div className={theme == 'dark'? 'dark' :''}>
      <div className="min-h-[100vh] bg-main-bg dark:bg-main-dark-bg">
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
