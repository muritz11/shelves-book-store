import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa6";

interface DropdownProps {
  value: string;
  itemOnClick: (val: string) => void;
  dropdownItems: any[];
  disabled?: boolean;
  className?: string;
}

const CustomDropdown = ({
  value,
  itemOnClick,
  dropdownItems = [],
  className = "",
  disabled = false,
}: DropdownProps) => {
  const [dropdownValue, setDropdownValue] = useState("");
  const [dropdownIcon, setDropdownIcon] = useState("");

  useEffect(() => {
    const val = dropdownItems.filter((item) => item.value === value);
    setDropdownValue(val[0]?.name || "");
    if (val[0]?.icon) {
      setDropdownIcon(val[0]?.icon);
    }
  }, [value, dropdownItems]);

  return (
    <>
      <Menu matchWidth={true}>
        <MenuButton
          isDisabled={disabled}
          className={className}
          type="button"
          display={"flex"}
          as={Button}
          rightIcon={<FaChevronDown />}
          width={"100%"}
          justifyContent={"space-between"}
          textAlign={"left"}
          variant={"outline"}
          fontWeight={400}
          textTransform={"capitalize"}
        >
          <Text as={"span"} display={"flex"} align={"center"}>
            {dropdownIcon ? (
              <Image boxSize={"20px"} src={dropdownIcon} mr={"12px"} alt="" />
            ) : (
              ""
            )}
            {dropdownValue || "Select"}
          </Text>
        </MenuButton>
        <MenuList maxH={"400px"} overflowY={"auto"}>
          {dropdownItems?.map((val, idx) => (
            <MenuItem
              key={`drp-${val?.name}-${idx}`}
              onClick={() => itemOnClick(val?.value)}
              textTransform={"capitalize"}
            >
              {val?.icon && (
                <Image boxSize={"20px"} src={val?.icon} mr={"12px"} alt="" />
              )}
              {val?.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default CustomDropdown;
