import { Typography } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { AuthContext, IUser } from "./context/AuthContext";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={user ? "/play" : "/login"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={<Typography variant="h1">404 not found</Typography>}
          />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
