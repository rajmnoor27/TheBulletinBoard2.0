import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import SavedArticles from "./components/SavedArticles.jsx";
import PrivateRoute from "./components/PrivateRoute";

createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/saved" element={<SavedArticles />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </Router>
);
