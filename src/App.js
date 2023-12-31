import React, { useState,useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Authenticate from './components/Store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 useEffect(()=>{
  const userLoginInformation=localStorage.getItem("isLogged");
  if(userLoginInformation==='1'){
    setIsLoggedIn(true);
  }
 },[])

  const loginHandler = (email, college,password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLogged','1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (  
     <Authenticate.Provider value={{isLoggedIN:isLoggedIn}}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </Authenticate.Provider>
    
  );
}

export default App;
