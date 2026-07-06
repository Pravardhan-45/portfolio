import { Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";

import UserInformation from "./pages/UserInformation";
import JDUpload from "./pages/JDUpload";
import PortfolioPreview from "./pages/PortfolioPreview"; 
import { isLoggedIn } from "./api/authApi";

const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/userinfo"
        element={
          <ProtectedRoute>
            <UserInformation />
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
