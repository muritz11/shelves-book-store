import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BookCard from "../../components/cards/BookCard";
import BookCardMini from "../../components/cards/BookCardMini";
import LayoutContainerWrapper from "../../components/dashboard/LayoutContainerWrapper";
import { IoChevronDownOutline } from "react-icons/io5";
import FeaturedBookCardMini from "../../components/cards/FeaturedBookCardMini";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// @ts-ignore
import Slider from "react-slick";
import { BookObj } from "../../redux/types";
import { Books, MyReadingList } from "../../redux/data";

const Filters = [
  {
    name: "Latest",
    value: "latest",
  },
];

const Lotteries = () => {
  const [filter, setFilter] = useState(Filters[0].value);
  const [isSmallerThan1260] = useMediaQuery("(max-width: 1260px)");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");
  const [readingList, setReadingList] = useState<BookObj[]>([]);

  useEffect(() => {
    const rl = Books?.filter((val) => MyReadingList.includes(val?.id));

    setReadingList(rl);
  }, []);

  return (
    <>
      <LayoutContainerWrapper asideChildren={<Aside />}>
        <Box mb={"24px"} minH={"100px"}>
          <Flex justify={"space-between"} align={"center"}>
            <Heading fontSize={"24px"} fontWeight={500}>
              My reading list
            </Heading>
            {/* <Text
              _hover={{ textDecor: "underline" }}
              transition={".3s ease-out"}
            >
              <Link to={"/library"}>My faves</Link>
            </Text> */}
          </Flex>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={4} mt={"10px"}>
            {readingList?.map((book) => (
              <BookCardMini key={book?.id} book={book} />
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Flex justify={"space-between"} flexWrap={"wrap"}>
            <Heading fontSize={"24px"} fontWeight={500}>
              Library
            </Heading>
            <Menu>
              <Flex gap={"10px"} align={"center"}>
                <Text>show:</Text>
                <MenuButton
                  as={Button}
                  variant={"link"}
                  color={"brand.black"}
                  fontWeight={400}
                  padding={0}
                  rightIcon={<IoChevronDownOutline />}
                >
                  {Filters.filter((val) => val.value === filter)[0].name}
                </MenuButton>
              </Flex>
              <MenuList>
                {Filters.map((val, index) => (
                  <MenuItem
                    key={"menu-" + index}
                    bg={val.value === filter ? "#EDF2F7" : ""}
                    onClick={() => setFilter(val.value)}
                  >
                    {val.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>

          {/* games */}
          <Box mt={"10px"}>
            {/* {!isLiveGamesLoading && !liveGames?.length ? (
                <Text textAlign={"center"} color={"brand.textMuted"} my={"100px"}>
                  Nothing to show here
                </Text>
              ) : (
                ""
              )} */}
            <SimpleGrid
              columns={{
                base: isLargerThan550 ? 3 : 2,
                md: 3,
                lg: isSmallerThan1260 ? 3 : 4,
              }}
              gap={4}
            >
              {Books?.map((book) => (
                <BookCard key={book?.id} book={book} />
              ))}
            </SimpleGrid>
            <Flex mt={"30px"} justify={"center"}>
              <Button w={["60%"]} colorScheme={"buttonPrimary"}>
                View more
              </Button>
            </Flex>
          </Box>
        </Box>
      </LayoutContainerWrapper>
    </>
  );
};

const Aside = () => {
  const [featuredBooks, setFeaturedBooks] = useState<BookObj[]>([]);

  useEffect(() => {
    const featured = Books.filter((book) => book?.isFeatured);
    setFeaturedBooks(featured);
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <Slider {...settings}>
        {featuredBooks.map((book) => (
          <FeaturedBookCardMini key={book?.id} book={book} />
        ))}
      </Slider>
    </>
  );
};

export default Lotteries;
