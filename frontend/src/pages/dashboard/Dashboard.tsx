import { useMemo, useState } from "react";
import { Box, Text, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import FeaturedBookCard from "../../components/cards/FeaturedBookCard";
import BookCard from "../../components/cards/BookCard";
import LayoutContainerWrapper from "../../components/dashboard/LayoutContainerWrapper";
import HorizontalTabButton from "../../utils/HorizontalTabButton";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// @ts-ignore
import Slider from "react-slick";
import { useFetchBooksQuery } from "../../redux/services/bookApi";
import Loader from "../../utils/Loader";
import { useFetchMeQuery } from "../../redux/services/accountApi";

const Dashboard = () => {
  const [tab, setTab] = useState("latest");
  const tabs = useMemo(
    () => [
      { label: "Latest", value: "latest" },
      { label: "Top rated", value: "topRated" },
      { label: "My Favorites", value: "liked" },
    ],
    []
  );
  const { data: user } = useFetchMeQuery();
  const { data: books, isFetching: isBooksFetching } = useFetchBooksQuery(
    `?limit=${10}&page=${1}&filter=${tab}&userId=${user?._id || ""}`
  );
  const { data: featuredBooks, isLoading: isFeaturedBooksLoading } =
    useFetchBooksQuery(`?limit=${100}&filter=featured`);

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

  const switchTab = (val: string) => {
    setTab(val);
  };

  return (
    <>
      <LayoutContainerWrapper asideChildren={<Aside />}>
        <Box mb={"24px"} minH={"200px"}>
          <Slider {...settings}>
            {featuredBooks?.data.map((book) => (
              <FeaturedBookCard key={book?._id} book={book} />
            ))}
          </Slider>
          <Loader isLoading={isFeaturedBooksLoading} height="100px" />
          {!isFeaturedBooksLoading && !featuredBooks?.data?.length ? (
            <Flex
              height={"232px"}
              rounded={"16px"}
              padding={["15px", "32px"]}
              width={{ base: "full", md: "80%" }}
              mx={"auto"}
              bg={"brand.lightGrey"}
              color={"brand.textMuted"}
              overflow={"hidden"}
              justify={"center"}
              align={"center"}
              direction={"column"}
            >
              <Text
                textAlign={"center"}
                fontSize={["16px", "20px"]}
                fontWeight={500}
                mb={1}
              >
                There are no featured books right now
              </Text>
              <Text
                textAlign={"center"}
                fontSize={["14px", "18px"]}
                fontWeight={400}
              >
                but stay tuned! Exciting books will be featured soon.
              </Text>
            </Flex>
          ) : (
            ""
          )}
        </Box>

        <Box>
          <Flex justify={"space-between"} flexWrap={"wrap"}>
            <Heading fontSize={"24px"} fontWeight={500}>
              Library
            </Heading>
          </Flex>
          <Box w={"full"} overflowX={"auto"} scrollBehavior={"smooth"}>
            <Flex minW={"550px"}>
              {tabs.map((value, index) => (
                <HorizontalTabButton
                  key={`hTab-${index}`}
                  title={value.label.toLowerCase()}
                  onClick={() => {
                    switchTab(value.value);
                  }}
                  isActive={tab === value.value}
                />
              ))}
            </Flex>
          </Box>

          {/* books */}
          <Box mt={"15px"}>
            <Flex
              gap={4}
              overflowX={"auto"}
              overflowY={"visible"}
              className={"hScroll"}
            >
              {!isBooksFetching &&
                books?.data?.map((book) => (
                  <BookCard key={book?._id} book={book} />
                ))}
            </Flex>
            <Loader isLoading={isBooksFetching} height="80px" />
            {!isBooksFetching && !books?.data?.length ? (
              <Text textAlign={"center"} color={"brand.textMuted"} my={"100px"}>
                Nothing to show here
              </Text>
            ) : (
              ""
            )}
            <Flex
              mt={"30px"}
              justify={"center"}
              display={isBooksFetching ? "none" : "flex"}
            >
              <Button
                w={["60%"]}
                as={Link}
                to={"/library"}
                colorScheme={"buttonPrimary"}
              >
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
  return <></>;
};

export default Dashboard;
