import { ReactNode, ReactText } from "react";
import {
  Box,
  Flex,
  Icon,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
  DrawerCloseButton,
  DrawerOverlay,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { CiGrid41, CiLogout } from "react-icons/ci";
import { PiGearSixLight } from "react-icons/pi";
import Logo from "../../assets/images/logo.png";
import MobileNav from "./TopNav";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/features/authSlice";
import "./Nav.css";
import { VscLibrary } from "react-icons/vsc";
import { HiOutlineUsers } from "react-icons/hi2";

interface LinkItemProps {
  name: string;
  icon: IconType;
  routeTo: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: CiGrid41, routeTo: "/dashboard" },
  { name: "Library", icon: VscLibrary, routeTo: "/library" },
  { name: "Authors", icon: HiOutlineUsers, routeTo: "/authors" },
  { name: "Settings", icon: PiGearSixLight, routeTo: "/settings" },
];

export function SideBar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", lg: "block" }}
        className={"sidebarI"}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <SidebarContent onClose={onClose} className={"sidebarII"} />
        </DrawerContent>
      </Drawer>

      {/* top nav */}
      <MobileNav onOpen={onOpen} />
      {/* <MobileNav /> */}

      {/* dashboard content */}
      <Box ml={{ md: 0, lg: "269px" }}>{children}</Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

/*******************
 * Main sidebar
 * *****************/
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const dispatch = useDispatch();

  const logOut = () => {
    // await signOut(auth);
    dispatch(logOutUser());
  };

  return (
    <Box
      transition="3s ease"
      w={{ base: "inherit", lg: "269px" }}
      pos="fixed"
      h="full"
      bg={"brand.primary"}
      padding={"24px 16px"}
      overflowY={"auto"}
      {...rest}
    >
      <Flex justifyContent="center">
        <Link to={"/"}>
          <Image src={Logo} alt="logo" height={"200px"} />
        </Link>
        {/* <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} /> */}
      </Flex>
      <Box mt={0}>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            onClick={onClose}
            routeTo={link.routeTo}
            icon={link.icon}
            mt={
              link.name === "Notification" || link.name === "Logout"
                ? "20px"
                : 0
            }
          >
            {link.name}
          </NavItem>
        ))}
        <NavItem onClick={logOut} routeTo={"/"} icon={CiLogout} mt={"20px"}>
          Logout
        </NavItem>
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  routeTo: string;
  children: ReactText;
}

const NavItem = ({ icon, routeTo, children, ...rest }: NavItemProps) => {
  return (
    <NavLink
      to={routeTo}
      className={({ isActive }) => (isActive ? "activeSideLink" : "")}
    >
      <Flex
        align="center"
        padding={"10px 16px"}
        gap={"8px"}
        color={"#fff"}
        fontSize={"1rem"}
        {...rest}
      >
        {icon && (
          <Icon
            fontSize="22px"
            _groupHover={{
              color: "brand.primaryII",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

// const SideBar = () => {
//   return (
//     <div>SideBar</div>
//   )
// }

export default SideBar;
