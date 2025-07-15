import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingScreen from "./pages/LandingScreen";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ContextProvider from './context/ContextProvider.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'
import PublicRoute from './components/PublicRoutes.jsx';

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <PublicRoute>
              <LandingScreen />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

          {/* Private routes */}
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
