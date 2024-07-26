import React from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface ElemProps {
  rating: number;
  mini?: boolean;
  setRating?: (val: number) => void;
}

const RateStars = ({ rating, mini, setRating }: ElemProps) => {
  const flooredRating = Math.floor(rating);
  const unrated = 5 - flooredRating;
  const solidStars = Array(flooredRating).fill(1);
  const outlinedStars = Array(unrated).fill(1);

  const handleStarClick = (idx: number) => {
    setRating?.(idx);
  };

  return (
    <Flex gap={1}>
      {solidStars?.map((_, idx) => (
        <Icon
          key={`solid-${idx}`}
          as={FaStar}
          fontSize={["14px", mini ? "14px" : "18px"]}
          color={"brand.secondary"}
          onClick={() => handleStarClick(idx + 1)}
          cursor={"pointer"}
        />
      ))}
      {outlinedStars?.map((_, idx) => (
        <Icon
          key={`outlined-${idx}`}
          as={FaRegStar}
          fontSize={["14px", mini ? "14px" : "18px"]}
          color={"brand.secondary"}
          onClick={() => handleStarClick(idx + 1 + rating)}
          cursor={"pointer"}
        />
      ))}
    </Flex>
  );
};

export default RateStars;
