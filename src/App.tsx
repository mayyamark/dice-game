import { Typography } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/common/RequireAuth/RequireAuth";
import Login from "./components/Login/Login";
import Play from "./components/Play/Play";
import Register from "./components/Register/Register";
import { AuthContext, IUser } from "./context/AuthContext";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/play"
            element={
              <RequireAuth redirectTo={"/login"}>
                <Play />
              </RequireAuth>
            }
          />
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
