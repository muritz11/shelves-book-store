import {
  Menu,
  MenuButton,
  FlexProps,
  MenuItem,
  MenuList,
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  MenuDivider,
  Button,
  //   Popover,
  //   PopoverTrigger,
  //   PopoverContent,
} from "@chakra-ui/react";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
//   import { useFetchProfileQuery } from "../../redux/services/accountApi";
// import { useDispatch } from "react-redux";
//   import { logOutUser } from "../../redux/features/authSlice";
//   import NotificationModal from "../notification/NotificationModal";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const TopNav = ({ onOpen, ...rest }: MobileProps) => {
  // const { data: user } = useFetchProfileQuery();
  //   const dispatch = useDispatch();

  // const logOut = () => {
  //   // await signOut(auth);
  //   dispatch(logOutUser());
  // };

  return (
    <Box
      pos={"sticky"}
      top={0}
      zIndex={10}
      bg={"root.black"}
      color={"root.white"}
    >
      <Flex
        p={{ base: "16px 15px", md: "16px 32px" }}
        maxW={"1230px"}
        mx={"auto"}
        height="20"
        alignItems="center"
        justifyContent={{ base: "space-between" }}
        gap={"15px"}
        {...rest}
      >
        {/* left side */}
        <Flex gap={"8px"} width={{ base: "60%", md: "inherit" }}>
          <IconButton
            display={{ base: "flex", lg: "none" }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
          />
          <Flex align={"center"} gap={3}>
            <Text fontSize={"21px"} fontWeight={600}>
              HQLS
            </Text>
            <Menu matchWidth={true}>
              <MenuButton
                as={Button}
                rightIcon={<FaChevronDown />}
                size={"sm"}
                fontWeight={400}
              >
                Ai Translator
              </MenuButton>
              <MenuList color={"root.black"}>
                <MenuItem>Ai Translator</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {/* right side */}
        <Flex gap={"16px"} align={"center"}>
          <Box borderRight={"1px solid"} paddingRight={"16px"}>
            <Flex gap={3}>
              <FiSearch fontSize={"20px"} cursor={"pointer"} />
              <FiBell fontSize={"20px"} cursor={"pointer"} />
            </Flex>
          </Box>

          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <HStack>
                  <Avatar size={"sm"} src={undefined} />
                  <Text
                    fontSize="sm"
                    display={{ base: "none", lg: "block" }}
                    textTransform={"capitalize"}
                  >
                    Adam Blake
                  </Text>
                  <Box>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </HStack>
            </MenuButton>
            <MenuList color={"root.black"}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopNav;
