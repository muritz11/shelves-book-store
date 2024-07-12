import { Flex, Icon, Text } from "@chakra-ui/react";
// import { FaEllipsis } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import LotteryBg from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { BookObj } from "../../redux/types";
import { truncateText } from "../../utils/helpers";
import { FaHeart, FaStar } from "react-icons/fa";

interface CardProps {
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

const LotteryGameCardMini = ({ book }: CardProps) => {
  const navigate = useNavigate();

  const redirectUrl = () => {
    navigate(`/library/view-book/${book?.id}`);
  };

  return (
    <Flex
      justify={"flex-start"}
      align={"center"}
      gap={"8px"}
      minW={"149px"}
      cursor={"pointer"}
      data-aos={"fade-up"}
      onClick={redirectUrl}
    >
      <Flex
        bg={"brand.black"}
        rounded={"8px"}
        color={"#fff"}
        flexDir={"column"}
        justify={"space-between"}
        padding={"8px"}
        boxSize={"80px"}
        align={"flex-end"}
        backgroundImage={`url("${book?.coverUrl || LotteryBg}")`}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
      >
        <Flex justify={"flex-start"} w={"full"}>
          <Flex
            padding={"2px 5px"}
            bg={"brand.secondaryTint"}
            rounded={"30px"}
            gap={"5px"}
            align={"center"}
          >
            <Icon
              as={FaStar}
              fontSize={["12px", "12px"]}
              color={"brand.secondary"}
            />
            <Text display={"inline-block"} fontSize={"10px"} color={"#48494D"}>
              {book?.rating || 0}
            </Text>
          </Flex>
        </Flex>
        <Icon as={MdVerified} color={"brand.secondary"} fontSize="18px" />
      </Flex>
      <Flex justify={"space-between"} my={"8px"} flexDir={"column"}>
        <Text
          fontSize={"14px"}
          fontWeight={500}
          textTransform={"capitalize"}
          title={book?.title}
        >
          {truncateText(book?.title, 8)}
        </Text>
        {/* <Text fontSize={"14px"} fontWeight={700}>
          ${jackpot}
        </Text> */}
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
    </Flex>
  );
};

export default LotteryGameCardMini;
