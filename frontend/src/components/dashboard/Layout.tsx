// import { useDisclosure } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../nav/Sidebar";

const Layout = () => {
  return (
    <>
      <Box bg={"#FAFAFB"}>
        <Sidebar>
          <Outlet />
        </Sidebar>
      </Box>
    </>
  );
};

export default Layout;
