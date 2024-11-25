import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Navbar } from "../src/components/Navbar";
import SignUp from "../src/components/SignUp";
import SignIn from "../src/components/SignIn";
import ParkingSpace from "../src/components/ParkingSpace";
import Wallet from "../src/components/Wallet"; 
import MyAccount from "./components/MyAccount";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/parking-spaces" element={<ParkingSpace />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/my-account" element={<MyAccount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
