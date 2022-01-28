import "./App.css";
import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { LogIn } from "./components/pages/LogIn";
import { MyData } from "./components/pages/MyData";
import { MyTasks } from "./components/pages/MyTasks";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/data" element={<MyData />} />
          <Route path="/todo" element={<MyTasks />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
