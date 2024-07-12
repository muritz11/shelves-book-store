import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
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
import { BookObj } from "../../redux/types";
import { Books, MyFaves } from "../../redux/data";

const Dashboard = () => {
  const [tab, setTab] = useState("Trending");
  const tabs = useMemo(() => ["Trending", "Top rated", "My Favorites"], []);
  const [featuredBooks, setFeaturedBooks] = useState<BookObj[]>([]);
  const [booksArr, setBooksArr] = useState<BookObj[]>([]);

  useEffect(() => {
    const featured = Books.filter((book) => book?.isFeatured);
    setFeaturedBooks(featured);
  }, []);

  useEffect(() => {
    const trendingTab = tabs[0];
    const topRated = tabs[1];
    const favorites = tabs[2];

    let filteredBooks = [];
    switch (tab) {
      case trendingTab:
        filteredBooks = Books;
        break;

      case topRated:
        filteredBooks = Books?.sort((a, b) => {
          const ratingA = a.rating === undefined ? -Infinity : a.rating;
          const ratingB = b.rating === undefined ? -Infinity : b.rating;
          return ratingB - ratingA;
        });
        break;

      case favorites:
        filteredBooks = Books?.filter((books) => MyFaves?.includes(books?.id));
        break;

      default:
        filteredBooks = Books;
        break;
    }
    setBooksArr(filteredBooks);
  }, [tab, tabs]);

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
            {featuredBooks.map((book) => (
              <FeaturedBookCard key={book?.id} book={book} />
            ))}
          </Slider>
          {/* <Loader isLoading={isLiveGamesLoading} height="100px" /> */}
          {/* {!isLiveGamesLoading && !featuredGames?.length ? (
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
          )} */}
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
                  title={value.toLowerCase()}
                  onClick={() => {
                    switchTab(value);
                  }}
                  isActive={tab === value}
                />
              ))}
            </Flex>
          </Box>

          {/* games */}
          <Box mt={"15px"}>
            <Flex
              gap={4}
              overflowX={"auto"}
              overflowY={"visible"}
              className={"hScroll"}
            >
              {booksArr?.map((book, idx) => (
                <BookCard key={`lt-${idx}`} book={book} />
              ))}
            </Flex>
            {/* <Loader isLoading={isLiveGamesLoading} height="80px" />
            {!isLiveGamesLoading && !gamesArr?.length ? (
              <Text textAlign={"center"} color={"brand.textMuted"} my={"100px"}>
                Nothing to show here
              </Text>
            ) : (
              ""
            )} */}
            <Flex
              mt={"30px"}
              justify={"center"}
              // display={isLiveGamesLoading ? "none" : "flex"}
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
  // const { formatMoney } = useTextTruncate();
  // const [mainWallet, setMainWallet] = useState<null | WalletTypeObj>(null);
  // const {
  //   data: walletBalance,
  //   isSuccess: isWalletBalanceSuccess,
  //   isLoading: isWalletBalanceLoading,
  // } = useFetchWalletBalanceQuery();

  // useEffect(() => {
  //   if (isWalletBalanceSuccess) {
  //     const mainWallet = walletBalance?.filter(
  //       (val) => val?.type?.toLowerCase() === "main"
  //     );

  //     setMainWallet(mainWallet[0]);
  //   }
  // }, [isWalletBalanceSuccess, walletBalance]);

  return (
    <>
      {/* <BalanceCard
        title={"Wallet Balance"}
        figure={formatMoney(mainWallet?.balance || 0)}
        isBalanceLoading={isWalletBalanceLoading}
        variant={"aside"}
      />
      <BalanceCard
        title={"Locked Balance"}
        figure={formatMoney(mainWallet?.lockedBalance || 0)}
        isBalanceLoading={isWalletBalanceLoading}
        variant={"aside"}
      />
      <QuestProgress />
      <ContactCard /> */}
    </>
  );
};

export default Dashboard;
