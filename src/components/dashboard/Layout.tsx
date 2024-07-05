// import { useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import RoutesAuth from "../../route/RoutesAuth";
import TopNav from "../nav/TopNav";

const Layout = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div style={{ maxWidth: "1440px", margin: "auto" }}>
        <RoutesAuth>
          <TopNav onOpen={() => null} />
          <Outlet />
        </RoutesAuth>
      </div>
    </>
  );
};

export default Layout;
