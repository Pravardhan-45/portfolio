import { Navigate, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/login";
import Register from "./pages/Register";

import UserInformation from "./pages/UserInformation";
import JDUpload from "./pages/JDUpload";
import ChooseFlow from "./pages/ChooseFlow";
import PortfolioPreview from "./pages/PortfolioPreview"; 
import { isLoggedIn } from "./api/authApi";

const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  return !isLoggedIn() ? children : <Navigate to="/choose-flow" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      <Route
        path="/userinfo"
        element={
          <ProtectedRoute>
            <UserInformation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/choose-flow"
        element={
          <ProtectedRoute>
            <ChooseFlow />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jd-upload"
        element={
          <ProtectedRoute>
            <JDUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/preview"
        element={
          <ProtectedRoute>
            <PortfolioPreview />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
