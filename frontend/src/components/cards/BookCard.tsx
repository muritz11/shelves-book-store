import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";
import DefaultBg from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { BookObj } from "../../redux/types";
import { checkEmptyFields, truncateText } from "../../utils/helpers";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import {
  useDeleteBookMutation,
  useFetchBooksQuery,
  useToggleLikeMutation,
  useUpdateBookMutation,
} from "../../redux/services/bookApi";
import { showSuccess, showError } from "../../utils/Alert";
import CustomPrompt from "../../utils/CustomPrompt";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFetchAuthorsQuery } from "../../redux/services/authorApi";
import { HiPencil } from "react-icons/hi2";
import CustomDropdown from "../../utils/CustomDropdown";
import CustomInput from "../../utils/CustomInput";
import CustomModal from "../../utils/CustomModal";
import CustomText from "../../utils/CustomText";
import { useUploadFileMutation } from "../../redux/services/fileApi";
import { useFetchMeQuery } from "../../redux/services/accountApi";
import { ImSpinner3 } from "react-icons/im";

interface CardProps {
  minW?: string | string[];
  book: BookObj;
}

const BookCard = ({ minW, book }: CardProps) => {
  const navigate = useNavigate();
  const fileElement: { current: any } | null = useRef(null);
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string>("");
  const [formState, setFormState] = useState({
    title: book?.title,
    genre: book?.genre,
    author: book?.author?._id,
    synopsis: book?.synopsis,
    numOfChapter: book?.numOfChapter,
    // releaseDate: ""
  });
  const { data: user } = useFetchMeQuery();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
  } = useDisclosure();
  const { data: authors, isSuccess: isAuthorSuccess } = useFetchAuthorsQuery();
  const {
    isOpen: isDelModalOpen,
    onOpen: onDelModalOpen,
    onClose: onDelModalClose,
  } = useDisclosure();
  const isBookLiked = book?.likes?.includes(user?._id || "");

  const { refetch: refetchLibBooks } = useFetchBooksQuery("?limit=12&page=1");
  const { refetch: refetchLikedBooks } = useFetchBooksQuery(
    `?limit=${50}&filter=${"liked"}&userId=${user?._id || ""}`
  );
  const { refetch: refetchDashLatest } = useFetchBooksQuery(
    `?limit=${10}&page=${1}&filter=latest&userId=${user?._id || ""}`
  );
  const { refetch: refetchDashTopRated } = useFetchBooksQuery(
    `?limit=${10}&page=${1}&filter=topRated&userId=${user?._id || ""}`
  );
  const { refetch: refetchDashLikedBooks } = useFetchBooksQuery(
    `?limit=${10}&page=${1}&filter=liked&userId=${user?._id || ""}`
  );

  const redirectUrl = () => {
    navigate(`/library/view-book/${book?._id}`);
  };

  // process author
  const [authorItemArr, setAuthorItemArr] = useState<any[]>([]);
  useEffect(() => {
    if (isAuthorSuccess) {
      const newArray = authors?.data.map((val) => ({
        name: val.name,
        value: val._id,
      }));

      setAuthorItemArr(newArray);
    }
  }, [isAuthorSuccess, authors?.data]);

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

  const [toggleLikedMutation, { isLoading: isToggleLikedLoading }] =
    useToggleLikeMutation();
  const toggleLiked = () => {
    toggleLikedMutation({ bookId: book?._id })
      .unwrap()
      .then((resp) => {
        showSuccess(resp?.message);
        refetchLibBooks();
        refetchLikedBooks();
        refetchDashLatest();
        refetchDashTopRated();
        refetchDashLikedBooks();
      })
      .catch((err) => {
        console.log(err);
        showError(`Could not ${isBookLiked ? "unlike" : "like"} book`);
      });
  };

  const [updateBookMutation, { isLoading: isUpdateBookLoading }] =
    useUpdateBookMutation();
  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useUploadFileMutation();
  const handleSubmit = async () => {
    const { title, genre, author, synopsis, numOfChapter } = formState;

    const isFieldsEmpty = checkEmptyFields({
      title,
      genre,
      author,
      number_of_chapters: numOfChapter,
      synopsis,
    });

    if (!isFieldsEmpty) {
      const fd = { ...formState };

      if (file) {
        const fileForm = new FormData();
        fileForm.append("file", file);

        await uploadFile(fileForm)
          .unwrap()
          .then((resp) => {
            // @ts-ignore
            fd["coverUrl"] = resp?.data?.secure_url;
          })
          .catch((err) => console.log("could not upload photo", err));
      }

      updateBookMutation({ bid: book?._id, body: fd })
        .unwrap()
        .then(() => {
          showSuccess("Book updated");
          setFormState({
            ...formState,
            title: "",
            genre: "",
            author: "",
            synopsis: "",
            // @ts-ignore
            numOfChapter: "",
          });
          onUpdateModalClose();
        })
        .catch((err) => {
          console.log(err);
          showError(err?.data?.message || err?.message || "An error occurred");
        });
    }
  };

  const [deleteBook, { isLoading: isDelItemLoading }] = useDeleteBookMutation();
  const deleteItem = () => {
    deleteBook(book?._id)
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

  return (
    <>
      <Box minW={minW || ["155px"]} data-aos={"fade-up"} cursor={"pointer"}>
        <Flex
          bg={"brand.black"}
          rounded={"16px"}
          color={"#fff"}
          flexDir={"column"}
          justify={"space-between"}
          padding={["15px", "15px"]}
          width={"100%"}
          height={["164px"]}
          backgroundImage={`url("${book?.coverUrl || DefaultBg}")`}
          backgroundSize={"cover"}
          backgroundRepeat={"no-repeat"}
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
          }
          pos={"relative"}
        >
          <Flex justify={"space-between"} align={"center"} flexWrap={"wrap"}>
            <Flex
              padding={"3px 8px"}
              bg={"brand.secondaryTint"}
              rounded={"30px"}
              gap={"5px"}
              align={"center"}
            >
              <Icon
                as={FaStar}
                fontSize={["14px", "18px"]}
                color={"brand.secondary"}
              />
              <Text
                display={"inline-block"}
                fontSize={"12px"}
                color={"#48494D"}
              >
                {book?.averageRating || 0}
              </Text>
            </Flex>

            <Menu>
              <MenuButton pos={"relative"} zIndex={2}>
                <Icon
                  as={BsThreeDots}
                  fontSize={["25px", "25px"]}
                  color={"#fff"}
                />
              </MenuButton>
              <MenuList color={"#000"} width={"50px"}>
                <MenuItem onClick={onUpdateModalOpen}>Update</MenuItem>
                <MenuItem onClick={onDelModalOpen}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Flex
            justify={"flex-end"}
            align={"center"}
            display={book?.isFeatured ? "flex" : "none"}
          >
            <Icon
              as={MdVerified}
              color={"brand.secondary"}
              fontSize={["25px", "25px"]}
            />
          </Flex>

          <Box
            pos={"absolute"}
            top={0}
            right={0}
            boxSize={"100%"}
            onClick={redirectUrl}
          ></Box>
        </Flex>
        <Box>
          <Flex justify={"space-between"} mt={"8px"}>
            <Tooltip hasArrow label={book?.title}>
              <Heading
                fontSize={["16px", "18px"]}
                fontWeight={500}
                textTransform={"capitalize"}
                onClick={redirectUrl}
              >
                {truncateText(book?.title, 12)}
              </Heading>
            </Tooltip>
            <Flex gap={"5px"} align={"center"} onClick={toggleLiked}>
              {isToggleLikedLoading ? (
                <Icon
                  as={ImSpinner3}
                  fontSize={["14px", "16px"]}
                  color={"brand.dangerDark"}
                />
              ) : (
                <Icon
                  as={isBookLiked ? FaHeart : FaRegHeart}
                  fontSize={["14px", "16px"]}
                  color={"brand.dangerDark"}
                />
              )}
              <Text
                display={"inline-block"}
                fontSize={"12px"}
                color={"#48494D"}
              >
                {book?.likes?.length}
              </Text>
            </Flex>
          </Flex>
          <Text
            color={"brand.textMuted"}
            textTransform={"capitalize"}
            onClick={redirectUrl}
          >
            {book?.genre}
          </Text>
        </Box>
      </Box>

      <CustomPrompt
        isOpen={isDelModalOpen}
        onClose={onDelModalClose}
        variant="danger"
        action={`delete this book`}
        primaryBtnAction={deleteItem}
        isActionLoading={isDelItemLoading}
      />

      <CustomModal
        isOpen={isUpdateModalOpen}
        onClose={onUpdateModalClose}
        title={"Update book"}
      >
        <Flex direction={"column"} gap={3}>
          <Flex justify={"center"} align={"center"} mb={3}>
            <Box
              pos={"relative"}
              width={"100px"}
              cursor={"pointer"}
              onClick={clickFileElem}
            >
              <Avatar src={book?.coverUrl || preview} boxSize={"100px"} />
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
            label="Title"
            name="title"
            value={formState.title}
            onChange={handleInputs}
          />
          <CustomInput
            label="Genre"
            name="genre"
            value={formState.genre}
            onChange={handleInputs}
          />
          <Box>
            <FormLabel fontSize={"16px"} fontWeight={500}>
              Author
            </FormLabel>
            <CustomDropdown
              value={formState.author}
              itemOnClick={(val) => setFormState({ ...formState, author: val })}
              dropdownItems={authorItemArr}
            />
          </Box>
          <CustomInput
            label="Number of chapters"
            type="number"
            name="numOfChapter"
            // @ts-ignore
            value={formState.numOfChapter}
            onChange={handleInputs}
          />
          <CustomText
            label="Synopsis"
            name="synopsis"
            value={formState.synopsis}
            onChange={handleInputs}
          />
          <Button
            variant={"primary"}
            width={"full"}
            mt={5}
            mb={3}
            onClick={handleSubmit}
            isLoading={isUpdateBookLoading || isUploadFileLoading}
          >
            Update
          </Button>
        </Flex>
      </CustomModal>
    </>
  );
};

export default BookCard;
