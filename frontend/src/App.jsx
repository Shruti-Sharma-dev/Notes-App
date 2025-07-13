
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingScreen from "./pages/LandingScreen";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ContextProvider from './context/ContextProvider.jsx'
function App() {


  return (
    <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path="/" element={ <LandingScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
