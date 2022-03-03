import { Box, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import React, { ChangeEvent, ReactNode } from "react";

const Container = styled(Box)(({ theme }) => ({
  width: "90%",
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    width: 400,
  },
}));

export interface IField {
  label: string;
  icon: ReactNode;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}

interface IProps {
  fields: IField[];
  buttonText: string;
  onClick: () => void;
}

const Login: React.FC<IProps> = ({ fields, buttonText, onClick, children }) => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      m="auto"
    >
      <Container>
        {fields.map(({ label, icon, onChange }) => (
          <TextField
            sx={{ width: "100%", marginBottom: 3 }}
            label={label}
            InputProps={{
              startAdornment: icon ? (
                <InputAdornment position="start">{icon}</InputAdornment>
              ) : null,
            }}
            variant="outlined"
            onChange={onChange}
          />
        ))}
        <Button fullWidth variant="contained" onClick={onClick}>
          {buttonText}
        </Button>
        {children}
      </Container>
    </Box>
  );
};

export default Login;
