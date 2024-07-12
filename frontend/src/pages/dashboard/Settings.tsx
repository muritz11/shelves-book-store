import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import LayoutContainerWrapper from "../../components/dashboard/LayoutContainerWrapper";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import CustomDropdown from "../../utils/CustomDropdown";
import { showError, showSuccess } from "../../utils/Alert";
import { checkEmptyFields } from "../../utils/helpers";

const EditProfile = () => {
  const fileElement: { current: any } | null = useRef(null);
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string>("");

  const [formState, setFormState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
  });

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const fileOnChange = (e: React.FocusEvent<HTMLInputElement>) => {
    let images = e.target.files;

    const allowedExtensions = /(\.jpeg|\.jpg|\.png)$/i;
    if (!allowedExtensions.exec(e.target.value)) {
      showError("Invalid file type");
      return false;
    }

    const TwoMB = 2097152;
    if (images?.length) {
      if (images[0].size >= TwoMB) {
        showError("File must be less than 2MB");
        return;
      } else {
        setFile(images?.length ? images[0] : undefined);
      }
    }
  };

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const clickFileElem = () => {
    if (fileElement.current) {
      fileElement.current.click();
    }
  };

  const submitForm = async () => {
    const { firstName, middleName, lastName, gender, dob } = formState;
    const isEmpty = checkEmptyFields({
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      gender,
      date_of_birth: dob,
    });

    if (!isEmpty) {
      showSuccess("profile update not yet available");
    }
  };

  return (
    <LayoutContainerWrapper asideChildren={<Aside />}>
      <Flex alignItems={"center"} mb={"10px"}>
        <Heading
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          m={"auto"}
          fontSize={"21px"}
          fontWeight={"semibold"}
        >
          Edit Profile
        </Heading>
      </Flex>

      <Flex
        direction={"column"}
        gap={"10px"}
        justifyContent={"center"}
        alignItems={"center"}
        m={"auto"}
      >
        <Avatar
          name={`user`}
          src={"" || preview}
          boxSize={"120px"}
          fontWeight={"semibold"}
        />

        <input
          type="file"
          ref={fileElement}
          onChange={fileOnChange}
          style={{ display: "none" }}
        />
        <Button variant={"outline"} bg={"inherit"} onClick={clickFileElem}>
          Change profile picture
        </Button>

        <Text textAlign={"center"} color={"#868686"} fontSize={"14px"}>
          At least 800 x 800 px recommended. <br />
          JPG or PNG allowed
        </Text>
      </Flex>

      <Box my={"20px"}>
        <hr />
      </Box>

      <Box>
        <Flex direction={"column"} gap={"30px"}>
          <Flex gap={"10px"}>
            <FormControl isRequired>
              <FormLabel fontSize={"14px"} fontWeight={"semibold"}>
                First Name
              </FormLabel>
              <Input
                focusBorderColor={"gray.300"}
                value={formState.firstName}
                name={"firstName"}
                onChange={handleInputs}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize={"14px"} fontWeight={"semibold"}>
                Middle Name
              </FormLabel>
              <Input
                focusBorderColor={"gray.300"}
                value={formState.middleName}
                name={"middleName"}
                onChange={handleInputs}
              />
            </FormControl>
          </Flex>

          <FormControl isRequired>
            <FormLabel fontSize={"14px"} fontWeight={"semibold"}>
              Last Name
            </FormLabel>
            <Input
              focusBorderColor={"gray.300"}
              value={formState.lastName}
              name={"lastName"}
              onChange={handleInputs}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize={"14px"} fontWeight={"semibold"}>
              Email Address
            </FormLabel>
            <Input
              focusBorderColor={"gray.300"}
              value={"john@doe.com"}
              readOnly
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize={"14px"} fontWeight={"semibold"}>
              Date of Birth
            </FormLabel>
            <Input
              type="date"
              value={formState.dob}
              name={"dob"}
              onChange={handleInputs}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize={"14px"} fontWeight={"semibold"}>
              Gender
            </FormLabel>
            <CustomDropdown
              value={formState.gender}
              itemOnClick={(val) => setFormState({ ...formState, gender: val })}
              dropdownItems={[
                {
                  name: "Male",
                  value: "male",
                },
                {
                  name: "Female",
                  value: "female",
                },
              ]}
            />
          </FormControl>

          <Box display="flex" justifyContent="flex-end" gap={4}>
            <Button
              size={"lg"}
              fontSize={"13px"}
              rounded={"8px"}
              fontWeight={400}
              colorScheme={"buttonPrimary"}
              color={"white"}
              onClick={submitForm}
              //   isLoading={isUpdateProfileLoading}
            >
              Update
            </Button>
          </Box>
        </Flex>
      </Box>
    </LayoutContainerWrapper>
  );
};

const Aside = () => {
  return <></>;
};

export default EditProfile;
