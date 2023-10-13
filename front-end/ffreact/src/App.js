import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState, useCallback, useEffect } from "react";


import AboutUs from "./components/AboutUs";
import GamePage from "./components/GamePage";
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import AuthContext from "./context/AuthContext";
import { refreshToken } from "./services/authapi";



//set a timeout to refresh tokens
const TIMEOUT_MILLISECONDS = 14*16*1000;

// Define a variable for the localStorage token item key
const LOCAL_STORAGE_TOKEN_KEY = "ffToken";

function App() {

  const [user, setUser] = useState(null);
  // NEW: Define a state variable to track if 
  // the restore login attempt has completed
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  // NEW: Define a useEffect hook callback function to attempt
  // to restore the user's token from localStorage
  const resetUser = useCallback(() => {
    refreshToken()
      .then((user) => {
        setUser(user);
        setTimeout(resetUser, TIMEOUT_MILLISECONDS);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRestoreLoginAttemptCompleted(true));
  }, []);

  useEffect(() => {
    resetUser();
  }, [resetUser]);

  const logout = () => {
    setUser(null);
    // NEW: remove the token from localStorage
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  const auth = {
    user: user ? { ...user } : null,
    handleLoggedIn(user) {
      setUser(user);
      setTimeout(resetUser, TIMEOUT_MILLISECONDS);
    },
    hasAuthority(authority) {
      return user?.authorities.includes(authority);
    },
    logout
  };

  return (
    <AuthContext.Provider value={auth}>

    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
    </AuthContext.Provider>

  );
}

export default App;
