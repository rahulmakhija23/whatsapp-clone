import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
function App() {
  // const [user, setUser] = useState(null);
  //above usestate was a temporary check of the login page but after that
  //we are just directly getting it from the data layer
  const [{ user }, dispatch] = useStateValue();
  return (
    <Router>
      <div className="app">
        {!user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />}></Route>
              {/* with the help of useparams in react-router-dom we will send data but : */}
              <Route path="/" element={<Chat />}></Route>
            </Routes>
          </div>
        )}

        {/* <h1>Whatsapp Clone</h1> */}
      </div>
    </Router>
  );
}

export default App;
