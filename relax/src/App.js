import './App.css';
import { useLuisoContext } from './Context/LuisoProvider';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Sign from './pages/Sign';
import React,{useEffect} from 'react';
import UserInfo from './pages/UserInfo';
import GamePage from './pages/GamePage';
import GameDetail from './pages/GameDetail';
import { getToken } from './utils/storage';
import { useDispatch,useSelector } from 'react-redux';
import { initUser,getUserInfo,fetchUserInfo } from './redux/features/userSlice';
function App() {
  const dispatch = useDispatch();
  const { theme } = useLuisoContext();

  useEffect(() => {
    getToken() && dispatch(fetchUserInfo())
  },[])
  return (
    <div className={theme == 'dark'? 'dark' :''}>
      <div className="min-h-[100vh] bg-main-bg dark:bg-main-dark-bg">
        <BrowserRouter>
          <Routes>
            {!getToken() ? <Route path="/" element={<Sign/>}/>:
            <>
              <Route path="/" element={<GamePage/>}/>
              <Route path="/sign" element={<Sign/>}/>
              <Route path="/gameDetail" element={<GameDetail/>}/>
              <Route path="/user" element={<UserInfo/>}/>
            </>
            }
            
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
