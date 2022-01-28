import "./App.css";
import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { LogIn } from "./components/pages/LogIn";
import { MyData } from "./components/pages/MyData";
import { MyTasks } from "./components/pages/MyTasks";
import { PrivateRoute } from "./components/helpers/PrivateRoute";
import { useEffect, useState } from "react";
import { AuthContext } from "./components/helpers/Context";

const SAVE_STATE = "1";
const SAVE_KEY = "auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem(SAVE_KEY) === SAVE_STATE
  );
  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem(SAVE_KEY, SAVE_STATE);
    } else {
      localStorage.removeItem(SAVE_KEY);
    }
  }, [loggedIn]);
  return (
    <div className="App">
      {loggedIn ? <NavBar setLoggedIn={setLoggedIn} /> : null}
      <div className="content">
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route
              path="/data"
              element={
                <PrivateRoute>
                  <MyData />
                </PrivateRoute>
              }
            />
            <Route
              path="/todo"
              element={
                <PrivateRoute>
                  <MyTasks />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;
