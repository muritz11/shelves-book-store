import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { AuthorObj } from "../../redux/types";
import { HiMiniTrash, HiPencil } from "react-icons/hi2";
// import { authors } from "../../redux/data";
import CustomPrompt from "../../utils/CustomPrompt";
import {
  useAddAuthorsMutation,
  useDeleteAuthorsMutation,
  useFetchAuthorsQuery,
  useUpdateAuthorsMutation,
} from "../../redux/services/authorApi";
import { showError, showSuccess } from "../../utils/Alert";
import {
  capitalizeFirstText,
  checkEmptyFields,
  truncateText,
} from "../../utils/helpers";
import Loader from "../../utils/Loader";
import CustomModal from "../../utils/CustomModal";
import CustomInput from "../../utils/CustomInput";
import CustomText from "../../utils/CustomText";
import Pagination from "../../utils/Pagination";
import BookColumnCard from "../../utils/BookColumnCard";

const Authors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: authors, isFetching: isAuthorsLoading } = useFetchAuthorsQuery(
    `?page=${currentPage}`
  );
  const fileElement: { current: any } | null = useRef(null);
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string>("");
  const [formState, setFormState] = useState({
    name: "",
    bio: "",
  });
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();

  const handleInputs = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const clickFileElem = () => {
    if (fileElement.current) {
      fileElement.current.click();
    }
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
        const reader = new FileReader();

        reader.onload = (base64) => {
          const img = new Image();
          img.onload = () => {
            setFile(images?.length ? images[0] : undefined);
            // localStorage["lotteryPhoto"] = reader.result;
          };

          // @ts-ignore
          img.src = base64.target.result;
        };

        reader.readAsDataURL(images[0]);
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

  const [addAuthor, { isLoading: isAddAuthorLoading }] =
    useAddAuthorsMutation();
  const handleSubmit = () => {
    const { name, bio } = formState;

    const isFieldsEmpty = checkEmptyFields({
      name,
      bio,
    });

    if (!isFieldsEmpty) {
      const fd = { ...formState };

      if (file) {
        // upload file & return secure_url
      }

      addAuthor(fd)
        .unwrap()
        .then(() => {
          showSuccess("Author added successfully");
          setFormState({
            ...formState,
            name: "",
            bio: "",
          });
          onAddModalClose();
        })
        .catch((err) => {
          console.log(err);
          showError(err?.data?.message || err?.message || "An error occurred");
        });
    }
  };

  return (
    <Box padding={7} pt={10}>
      <Box
        mt={[3, 0]}
        rounded={"12px"}
        minH={"300px"}
        bg={"#fff"}
        px={"20px"}
        py={"13px"}
      >
        <Flex
          justifyContent={"space-between"}
          align={"center"}
          direction={{ base: "column", md: "row" }}
          gap={"15px"}
        >
          <Heading
            as={"h3"}
            fontSize={"20px"}
            fontWeight={700}
            letterSpacing={"-2%"}
          >
            Authors
          </Heading>
          <Flex
            align={"center"}
            gap={3}
            width={{ base: "full", md: "50%" }}
            direction={["column", "row"]}
            justify={"flex-end"}
          >
            <Button
              rightIcon={<FiPlus />}
              width={["full", "initial"]}
              size={"sm"}
              variant="primary"
              onClick={onAddModalOpen}
            >
              Add Author
            </Button>
          </Flex>
        </Flex>

        {/* table */}
        <TableContainer mt={"20px"}>
          <Table variant="simple">
            <Thead>
              <Tr color={"#534D59"}>
                <Th>Name</Th>
                <Th>Bio</Th>
                <Th textAlign="right" pr={1}>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {!isAuthorsLoading &&
                authors?.data?.map((val) => (
                  <RowItem key={val?._id} val={val} />
                ))}
            </Tbody>
          </Table>
          <Loader isLoading={isAuthorsLoading} height={"200px"} />
          {!isAuthorsLoading && !authors?.data?.length ? (
            <Text my={"200px"} textAlign={"center"} color={"root.textMuted"}>
              You have not added any authors yet
            </Text>
          ) : (
            ""
          )}
        </TableContainer>
        <Pagination
          limit={10}
          curPage={currentPage}
          totalItems={authors?.total || 0}
          paginate={(num: number) => setCurrentPage(num)}
        />
      </Box>

      {/* add author modal */}
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        title={"Add author"}
      >
        <Flex direction={"column"} gap={3}>
          <Flex justify={"center"} align={"center"} mb={3}>
            <Box
              pos={"relative"}
              width={"100px"}
              cursor={"pointer"}
              onClick={clickFileElem}
            >
              <Avatar src={preview} boxSize={"100px"} />
              <input
                type="file"
                ref={fileElement}
                onChange={fileOnChange}
                style={{ display: "none" }}
              />
              <Button
                bg={"brand.white"}
                pos={"absolute"}
                bottom={0}
                right={0}
                size="xs"
                padding={"5px"}
                shadow={"md"}
              >
                <HiPencil color="#000" fontSize={"18px"} />
              </Button>
            </Box>
          </Flex>
          <CustomInput
            label="Author's name"
            name="name"
            value={formState.name}
            onChange={handleInputs}
          />
          <CustomText
            label="Bio"
            name="bio"
            value={formState.bio}
            onChange={handleInputs}
          />
          <Button
            variant={"primary"}
            width={"full"}
            mt={5}
            mb={3}
            onClick={handleSubmit}
            isLoading={isAddAuthorLoading}
          >
            Add
          </Button>
        </Flex>
      </CustomModal>
    </Box>
  );
};

const RowItem = ({ val }: { val: AuthorObj }) => {
  const fileElement: { current: any } | null = useRef(null);
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string>("");
  const [formState, setFormState] = useState({
    name: val?.name,
    bio: val?.bio,
  });
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
  } = useDisclosure();
  const {
    isOpen: isPublicationsModalOpen,
    onOpen: onPublicationsModalOpen,
    onClose: onPublicationsModalClose,
  } = useDisclosure();
  const {
    isOpen: isDelModalOpen,
    onOpen: onDelModalOpen,
    onClose: onDelModalClose,
  } = useDisclosure();

  const [deleteAuthor, { isLoading: isDelItemLoading }] =
    useDeleteAuthorsMutation();

  const handleInputs = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
  };

  const clickFileElem = () => {
    if (fileElement.current) {
      fileElement.current.click();
    }
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
        const reader = new FileReader();

        reader.onload = (base64) => {
          const img = new Image();
          img.onload = () => {
            setFile(images?.length ? images[0] : undefined);
            // localStorage["lotteryPhoto"] = reader.result;
          };

          // @ts-ignore
          img.src = base64.target.result;
        };

        reader.readAsDataURL(images[0]);
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

  const deleteItem = () => {
    deleteAuthor(val?._id)
      .unwrap()
      .then(() => {
        showSuccess("Author deleted successfully");
        onDelModalClose();
      })
      .catch((err) => {
        console.log(err);
        showError(err?.error?.message || err?.message || "An error occurred");
      });
  };

  const [updateAuthor, { isLoading: isUpdateAuthorLoading }] =
    useUpdateAuthorsMutation();
  const handleSubmit = () => {
    const { name, bio } = formState;

    const isFieldsEmpty = checkEmptyFields({
      name,
      bio,
    });

    if (!isFieldsEmpty) {
      const fd = { ...formState };

      if (file) {
        // upload db
      }

      updateAuthor({ body: fd, aid: val?._id || "" })
        .unwrap()
        .then(() => {
          showSuccess("Author updated succesfully");
          setFormState({
            ...formState,
            name: "",
            bio: "",
          });
          onUpdateModalClose();
        })
        .catch((err) => {
          console.log(err);
          showError(err?.data?.message || err?.message || "An error occurred");
        });
    }
  };

  return (
    <>
      <Tr _hover={{ bg: "#FAFAFB", cursor: "pointer" }}>
        <Td onClick={onUpdateModalOpen}>
          <Flex align={"center"} gap={2}>
            <Avatar src={val?.coverUrl} boxSize={"33px"} />
            <Text textTransform={"capitalize"}>{`${val?.name}`}</Text>
          </Flex>
        </Td>
        <Td onClick={onUpdateModalOpen}>{truncateText(val?.bio, 70)}</Td>
        <Td pr={1}>
          <Flex align={"center"} justify={"flex-end"} gap={"10px"}>
            <Button
              variant={"ghost"}
              size={"sm"}
              fontWeight={400}
              textDecor={"underline"}
              onClick={onPublicationsModalOpen}
            >
              Publications
            </Button>
            <Flex
              bg={"#BBBBBD"}
              rounded={"50%"}
              boxSize={"25px"}
              justify={"center"}
              align={"center"}
              cursor={"pointer"}
              onClick={onDelModalOpen}
            >
              <Icon as={HiMiniTrash} color={"#000"} />
            </Flex>
          </Flex>
        </Td>
      </Tr>

      <CustomPrompt
        isOpen={isDelModalOpen}
        onClose={onDelModalClose}
        variant="danger"
        action={`delete this author`}
        primaryBtnAction={deleteItem}
        isActionLoading={isDelItemLoading}
      />

      <CustomModal
        isOpen={isPublicationsModalOpen}
        onClose={onPublicationsModalClose}
        title={`${capitalizeFirstText(val?.name)}'s publications`}
      >
        {val?.books?.map((value) => (
          <BookColumnCard book={value} key={value?._id} />
        ))}
        {!val?.books?.length ? (
          <Text textAlign={"center"} color={"brand.textMuted"} mb={7}>
            No publications yet
          </Text>
        ) : (
          ""
        )}
      </CustomModal>

      <CustomModal
        isOpen={isUpdateModalOpen}
        onClose={onUpdateModalClose}
        title={"Update author"}
      >
        <Flex direction={"column"} gap={3}>
          <Flex justify={"center"} align={"center"} mb={3}>
            <Box
              pos={"relative"}
              width={"100px"}
              cursor={"pointer"}
              onClick={clickFileElem}
            >
              <Avatar src={val?.coverUrl || preview} boxSize={"100px"} />
              <input
                type="file"
                ref={fileElement}
                onChange={fileOnChange}
                style={{ display: "none" }}
              />
              <Button
                bg={"brand.white"}
                pos={"absolute"}
                bottom={0}
                right={0}
                size="xs"
                padding={"5px"}
                shadow={"md"}
              >
                <HiPencil color="#000" fontSize={"18px"} />
              </Button>
            </Box>
          </Flex>
          <CustomInput
            label="Author's name"
            name="name"
            value={formState.name}
            onChange={handleInputs}
          />
          <CustomText
            label="Bio"
            name="bio"
            value={formState.bio}
            onChange={handleInputs}
          />
          <Button
            variant={"primary"}
            width={"full"}
            mt={5}
            mb={3}
            onClick={handleSubmit}
            isLoading={isUpdateAuthorLoading}
          >
            Update
          </Button>
        </Flex>
      </CustomModal>
    </>
  );
};

export default Authors;
