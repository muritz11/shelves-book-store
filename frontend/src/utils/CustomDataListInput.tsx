import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  FormControlProps,
} from "@chakra-ui/react";

interface CustomInputProps extends FormControlProps {
  label?: string;
  value: string;
  name: string;
  list: string[];
  id: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange: (e: any) => void;
}

const CustomDataListInput = ({
  label,
  value,
  name,
  onChange,
  placeholder = "",
  readOnly = false,
  list,
  id,
  ...rest
}: CustomInputProps) => {
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
          px={0}
          border={"none"}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          list={id}
          _focusVisible={{ border: "none" }}
        />
      </Flex>

      <datalist id={id}>
        {list?.map((val, idx) => (
          <option key={`dl-${idx}`} value={val} />
        ))}
      </datalist>
    </FormControl>
  );
};

export default CustomDataListInput;
