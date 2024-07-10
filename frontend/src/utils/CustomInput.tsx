import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  FormControlProps,
  Icon,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface CustomInputProps extends FormControlProps {
  label?: string;
  type?: string;
  value: string;
  name: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange: (e: any) => void;
}

const CustomInput = ({
  label,
  type = "text",
  value,
  name,
  onChange,
  placeholder = "",
  readOnly = false,
  ...rest
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordType = showPassword ? "text" : "password";

  return (
    <FormControl {...rest}>
      {label ? (
        <FormLabel fontWeight={500} color={"#48494D"}>
          {label}
        </FormLabel>
      ) : (
        ""
      )}
      <Flex
        align={"center"}
        rounded={"8px"}
        border={"1px"}
        borderColor={"#D3D4DA"}
        px={"16px"}
        height={"48px"}
      >
        <Input
          type={type === "password" ? passwordType : type}
          px={0}
          border={"none"}
          name={name}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          _focusVisible={{ border: "none" }}
        />
        {type === "password" ? (
          <Icon
            as={showPassword ? FiEyeOff : FiEye}
            onClick={() => setShowPassword(!showPassword)}
            cursor="pointer"
          />
        ) : (
          ""
        )}
      </Flex>
    </FormControl>
  );
};

export default CustomInput;
