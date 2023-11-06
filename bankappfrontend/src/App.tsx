import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import RequireAuth from "./utils/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import SignUpForm from "./components/AuthForms/SignUpForm";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App" id="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth redirectTo="/auth">
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
