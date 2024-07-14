import {
  FormControl,
  FormLabel,
  FormControlProps,
  Textarea,
} from "@chakra-ui/react";

interface CustomTextProps extends FormControlProps {
  label?: string;
  type?: string;
  value: string;
  name: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange: (e: any) => void;
}

const CustomText = ({
  label,
  type = "text",
  value,
  name,
  onChange,
  placeholder = "",
  readOnly = false,
  ...rest
}: CustomTextProps) => {
  return (
    <FormControl {...rest}>
      {label ? (
        <FormLabel fontWeight={500} color={"#48494D"}>
          {label}
        </FormLabel>
      ) : (
        ""
      )}
      <Textarea
        rounded={"8px"}
        border={"1px"}
        borderColor={"#D3D4DA"}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        minH={"150px"}
      />
    </FormControl>
  );
};

export default CustomText;
