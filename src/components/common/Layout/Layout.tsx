import Box from "@mui/system/Box";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return <Box m={4}>{children}</Box>;
};

export const FullScreenLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      m="auto"
    >
      {children}
    </Box>
  );
};
