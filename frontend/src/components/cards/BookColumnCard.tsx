import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { truncateText } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { BookObj } from "../../redux/types";
import DefaultBg from "../../assets/images/logo.png";

const BookColumnCard = ({ book }: { book: BookObj }) => {
  const navigate = useNavigate();
  const viewGame = () => {
    navigate(`/library/view-book/${book?._id}`);
  };

  return (
    <>
      <Flex
        justifyContent={"flex-start"}
        cursor="pointer"
        mb={"10px"}
        bg={"brand.white"}
        rounded={"16px"}
        border={"1px solid"}
        borderColor={"brand.lightGrey"}
        shadow={"0px 4px 16px 0px rgba(0, 0, 0, 0.06)"}
        padding={"12px"}
        onClick={viewGame}
        gap={3}
      >
        <Box boxSize={"44px"} bg={"grey"} rounded={"8px"} overflow={"hidden"}>
          <img
            src={book?.coverUrl || DefaultBg}
            width={"100%"}
            height={"100%"}
            style={{ objectFit: "cover", borderRadius: "8px" }}
            alt="bank"
          />
        </Box>
        <Box>
          <Text
            fontSize={"16px"}
            fontWeight={500}
            textTransform={"capitalize"}
            title={book?.title}
          >
            {truncateText(book?.title, 18)}
          </Text>
          <Text fontSize={"14px"} color={"brand.textMuted"}>
            {truncateText(book?.genre, 20)}
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default BookColumnCard;
