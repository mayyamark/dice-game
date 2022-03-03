import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormContainer from "../common/FormContainer/FormContainer";

const Login: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  return (
    <FormContainer
      onClick={() => {}}
      buttonText="Login"
      fields={[
        {
          label: "Email",
          onChange: (ev) => setUser({ ...user, email: ev.target.value }),
          icon: <AccountCircle />,
        },
        {
          label: "Password",
          onChange: (ev) => setUser({ ...user, password: ev.target.value }),
          icon: <LockIcon />,
        },
      ]}
    >
      <Box
        sx={{
          marginTop: 2,
          textAlign: "center",
          "& a": { textDecoration: "none", color: "primary.main" },
        }}
      >
        <Link to="/register">Don't have an account? Register...</Link>
      </Box>
    </FormContainer>
  );
};

export default Login;
