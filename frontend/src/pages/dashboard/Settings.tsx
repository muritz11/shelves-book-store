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
} from "@chakra-ui/react";
import { showError, showSuccess } from "../../utils/Alert";
import { checkEmptyFields } from "../../utils/helpers";
import {
  useFetchMeQuery,
  useUpdateProfileMutation,
} from "../../redux/services/accountApi";
import { useUploadFileMutation } from "../../redux/services/fileApi";

const EditProfile = () => {
  const fileElement: { current: any } | null = useRef(null);
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string>("");
  const { data: user, isSuccess: isUserSuccess } = useFetchMeQuery();

  const [formState, setFormState] = useState({
    fullName: "",
  });

  useEffect(() => {
    if (isUserSuccess) {
      setFormState((prevState) => ({ ...prevState, fullName: user?.fullName }));
    }
  }, [isUserSuccess, user?.fullName]);

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

  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateProfileMutation();
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useUploadFileMutation();
  const submitForm = async () => {
    const { fullName } = formState;
    const isEmpty = checkEmptyFields({
      name: fullName,
    });

    if (!isEmpty) {
      const fd: { fullName: string; coverUrl?: string } = { ...formState };

      if (file) {
        const fileForm = new FormData();
        fileForm.append("file", file);

        await uploadFile(fileForm)
          .unwrap()
          .then((resp) => {
            fd["coverUrl"] = resp?.data?.secure_url;
          })
          .catch((err) => console.log("could not upload photo", err));
      }

      updateProfile(fd)
        .unwrap()
        .then(() => {
          showSuccess("Profile updated succesfully");
        })
        .catch((err) => {
          console.log(err);
          showError(err?.message || err?.date?.message || "An error occurred");
        });
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
          name={user?.fullName}
          src={user?.coverUrl || preview}
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
      </Flex>

      <Box my={"20px"}>
        <hr />
      </Box>

      <Box>
        <Flex direction={"column"} gap={"30px"}>
          <FormControl isRequired>
            <FormLabel fontSize={"14px"} fontWeight={"semibold"}>
              Full Name
            </FormLabel>
            <Input
              focusBorderColor={"gray.300"}
              value={formState.fullName}
              name={"fullName"}
              onChange={handleInputs}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize={"14px"} fontWeight={"semibold"}>
              Email Address
            </FormLabel>
            <Input focusBorderColor={"gray.300"} value={user?.email} readOnly />
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
              isLoading={isUpdateProfileLoading || isUploadFileLoading}
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
