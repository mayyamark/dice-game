import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormContainer from "../common/FormContainer/FormContainer";

const Register: React.FC = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  return (
    <FormContainer
      onClick={() => {}}
      buttonText="Register"
      fields={[
        {
          label: "First Name",
          onChange: (ev) => setUser({ ...user, firstName: ev.target.value }),
          icon: null,
        },
        {
          label: "Last Name",
          onChange: (ev) => setUser({ ...user, lastName: ev.target.value }),
          icon: null,
        },
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
        {
          label: "Confirm Password",
          onChange: (ev) =>
            setUser({ ...user, passwordConfirm: ev.target.value }),
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
        <Link to="/login">Already have an account? Login...</Link>
      </Box>
    </FormContainer>
  );
};

export default Register;
