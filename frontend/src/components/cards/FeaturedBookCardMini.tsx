import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { BookObj } from "../../redux/types";
import { truncateText } from "../../utils/helpers";
import { FaStar } from "react-icons/fa";

const FeaturedBookCardMini = ({ book }: { book: BookObj }) => {
  const navigate = useNavigate();

  const viewGame = () => {
    navigate(`/library/view-book/${book?._id}`);
  };

  return (
    <Box
      height={"232px"}
      rounded={"16px"}
      padding={"32px"}
      width={{ base: "full" }}
      mx={"auto"}
      bg={"brand.black"}
      position={"relative"}
      color={"brand.white"}
      overflow={"hidden"}
    >
      <Flex
        flexDir={"column"}
        gap={"8px"}
        mb={"28px"}
        pos={"relative"}
        zIndex={2}
      >
        <Heading
          fontSize={"20px"}
          fontWeight={700}
          textTransform={"capitalize"}
        >
          {truncateText(book?.title, 15)}
        </Heading>
        <Text fontSize={"14px"}>Click to start reading</Text>
        <Flex gap={"8px"}>
          <Flex
            padding={"3px 8px"}
            bg={"brand.secondaryTint"}
            rounded={"30px"}
            gap={"5px"}
            align={"center"}
          >
            <Icon
              as={FaStar}
              fontSize={["14px", "18px"]}
              color={"brand.secondary"}
            />
            <Text display={"inline-block"} fontSize={"12px"} color={"#48494D"}>
              {0}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Button
        size={["md"]}
        variant={"outline"}
        border={"2px solid"}
        rounded={"8px"}
        borderColor={"brand.white"}
        color={"brand.white"}
        transition={"0.3s ease-out"}
        width={["180px"]}
        fontWeight={400}
        _hover={{ bg: "rgba(255, 255, 255, 0.4)" }}
        pos={"relative"}
        zIndex={2}
        onClick={viewGame}
      >
        Read Book!
      </Button>
      <Image
        src={book?.coverUrl}
        position={"absolute"}
        top={0}
        right={0}
        width={"100%"}
        height={"100%"}
        objectFit={"cover"}
        zIndex={1}
        opacity={"0.3"}
      />
      <Image
        src={Logo}
        position={"absolute"}
        right={"-100px"}
        bottom={"-30px"}
        height={["70%", "85%"]}
        opacity={"0.7 !important"}
        className="featureDiceAnime"
        data-aos={"fade-up-left"}
        data-aos-duration={1500}
        zIndex={1}
        alt=""
      />
    </Box>
  );
};

export default FeaturedBookCardMini;
