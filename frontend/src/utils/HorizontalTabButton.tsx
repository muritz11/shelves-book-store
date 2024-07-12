import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

interface BtnProps extends ButtonProps {
  title: string;
  isActive: boolean;
  onClick?: () => void;
}

const HorizontalTabButton = ({
  title,
  isActive,
  onClick,
  ...rest
}: BtnProps) => {
  return (
    <Button
      variant={"ghost"}
      padding={"16px"}
      rounded={0}
      color={isActive ? "brand.primary" : "#bbb"}
      borderBottom={"2px solid"}
      fontSize={"14px"}
      fontWeight={500}
      onClick={onClick}
      borderBottomColor={isActive ? "brand.primary" : "brand.lightGrey"}
      textTransform={"capitalize"}
      {...rest}
    >
      {title}
    </Button>
  );
};

export default HorizontalTabButton;
