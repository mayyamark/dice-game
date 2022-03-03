import Box from "@mui/system/Box";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <Box m={4}>{children}</Box>;
};

export default Layout;
