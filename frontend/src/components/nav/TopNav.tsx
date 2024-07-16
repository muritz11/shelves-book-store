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
  Input,
} from "@chakra-ui/react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/features/authSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { useFetchMeQuery } from "../../redux/services/accountApi";
import { useQuery } from "../../pages/dashboard/Search";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const urlQuery = useQuery();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: user } = useFetchMeQuery();

  const logOut = () => {
    dispatch(logOutUser());
  };

  useEffect(() => {
    if (urlQuery?.query) {
      setSearchQuery(urlQuery?.query);
    }
  }, [urlQuery?.query]);

  const navigate = useNavigate();
  const handleSearch = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <Box
      ml={{ base: 0, lg: "269px" }}
      border={"1px solid #e8e8e8"}
      pos={"sticky"}
      top={0}
      zIndex={10}
      bg={"#fff"}
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
        <Flex gap={"8px"} width={{ base: "60%", md: "inherit" }}>
          <IconButton
            display={{ base: "flex", lg: "none" }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
          />
          {/* search input */}
          <form onSubmit={handleSearch}>
            <Flex
              align={"center"}
              bg={"#f3f3f3"}
              rounded="99px"
              padding={"8px"}
              width={{ base: "full", md: "375px" }}
              gap={1}
            >
              <CiSearch size={22} />
              <Input
                placeholder="Search book or author by name"
                border={"none"}
                outline={"none"}
                width={"100%"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                height={"17px"}
                fontSize={"14px"}
                type="search"
                px={0}
                _focusWithin={{
                  boxShadow: "none",
                }}
              />
            </Flex>
          </form>
        </Flex>

        <Flex gap={"16px"} align={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <HStack>
                  <Avatar
                    size={"sm"}
                    name={`${user?.fullName}`}
                    src={user?.coverUrl}
                  />
                  <Text
                    fontSize="sm"
                    display={{ base: "none", lg: "block" }}
                    textTransform={"capitalize"}
                  >
                    {user?.fullName?.split(" ")[0]}
                  </Text>
                  <Box>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </HStack>
            </MenuButton>
            <MenuList>
              <Link to={"/settings"}>
                <MenuItem>Settings</MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem onClick={logOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MobileNav;
