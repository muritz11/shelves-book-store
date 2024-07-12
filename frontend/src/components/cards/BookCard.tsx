import { Box, Flex, Heading, Icon, Text, Tooltip } from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";
import DefaultBg from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { BookObj } from "../../redux/types";
import { truncateText } from "../../utils/helpers";
import { FaHeart, FaStar } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

interface CardProps {
  minW?: string | string[];
  book: BookObj;
}

// function formatNumber(num: number) {
//   if (num < 1000) {
//     return num.toString();
//   } else if (num < 10000) {
//     return (num / 1000).toFixed(1) + "k";
//   } else if (num < 1000000) {
//     return (num / 1000).toFixed(0) + "k";
//   } else if (num < 10000000) {
//     return (num / 1000000).toFixed(1) + "m";
//   } else {
//     return (num / 1000000).toFixed(0) + "m";
//   }
// }

const BookCard = ({ minW, book }: CardProps) => {
  const navigate = useNavigate();
  // const { formatDuration } = useTimeFormatter();
  // const timeLeft = formatDuration(book?.endOn);

  const redirectUrl = () => {
    navigate(`/library/view-book/${book?.id}`);
  };

  return (
    <Box
      minW={minW || ["155px"]}
      data-aos={"fade-up"}
      cursor={"pointer"}
      onClick={redirectUrl}
    >
      <Flex
        bg={"brand.black"}
        rounded={"16px"}
        color={"#fff"}
        flexDir={"column"}
        justify={"space-between"}
        padding={["15px", "15px"]}
        width={"100%"}
        height={["164px"]}
        backgroundImage={`url("${book?.coverUrl || DefaultBg}")`}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        boxShadow={
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
        }
        transition={"0.3s ease-out"}
        _hover={{
          transform: "translateY(-2px)",
        }}
      >
        <Flex justify={"space-between"} align={"center"} flexWrap={"wrap"}>
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
              {book?.rating || 0}
            </Text>
          </Flex>
          <Icon as={BsThreeDots} fontSize={["25px", "25px"]} color={"#fff"} />
        </Flex>
        <Flex justify={"flex-end"} align={"center"}>
          <Icon
            as={MdVerified}
            color={"brand.secondary"}
            fontSize={["25px", "25px"]}
          />
        </Flex>
      </Flex>
      <Flex justify={"space-between"} mt={"8px"}>
        <Tooltip hasArrow label={book?.title}>
          <Heading
            fontSize={["16px", "18px"]}
            fontWeight={500}
            textTransform={"capitalize"}
          >
            {truncateText(book?.title, 12)}
          </Heading>
        </Tooltip>
        <Flex gap={"5px"} align={"center"}>
          <Icon
            as={FaHeart}
            fontSize={["14px", "16px"]}
            color={"brand.dangerDark"}
          />
          <Text display={"inline-block"} fontSize={"12px"} color={"#48494D"}>
            {book?.likes || 0}
          </Text>
        </Flex>
      </Flex>
      <Text
        color={"brand.textMuted"}
        // fontWeight={500}
        textTransform={"capitalize"}
      >
        {book?.genre}
      </Text>
    </Box>
  );
};

export default BookCard;
