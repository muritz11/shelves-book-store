import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import BookCard from "../../components/cards/BookCard";
import BookCardMini from "../../components/cards/BookCardMini";
import LayoutContainerWrapper from "../../components/dashboard/LayoutContainerWrapper";
import { IoChevronDownOutline } from "react-icons/io5";
import FeaturedBookCardMini from "../../components/cards/FeaturedBookCardMini";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// @ts-ignore
import Slider from "react-slick";
import {
  useAddBookMutation,
  useFetchBooksQuery,
  useFetchGenresQuery,
} from "../../redux/services/bookApi";
import Loader from "../../utils/Loader";
import { useFetchMeQuery } from "../../redux/services/accountApi";
import { useFetchAuthorsQuery } from "../../redux/services/authorApi";
import { showError, showSuccess } from "../../utils/Alert";
import { checkEmptyFields } from "../../utils/helpers";
import CustomModal from "../../utils/CustomModal";
import { HiPencil } from "react-icons/hi2";
import CustomInput from "../../utils/CustomInput";
import CustomText from "../../utils/CustomText";
import CustomDropdown from "../../utils/CustomDropdown";
import { useUploadFileMutation } from "../../redux/services/fileApi";
import CustomDataListInput from "../../utils/CustomDataListInput";

const Library = () => {
  const limit = 12;
  const [offset, setOffset] = useState(limit);
  const [filter, setFilter] = useState("");
  const [isSmallerThan1260] = useMediaQuery("(max-width: 1260px)");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");
  const { data: user } = useFetchMeQuery();
  const { data: genres } = useFetchGenresQuery();
  const fileElement: { current: any } | null = useRef(null);
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string>("");
  const [formState, setFormState] = useState({
    title: "",
    genre: "",
    author: "",
    synopsis: "",
    numOfChapter: "",
    // releaseDate: ""
  });
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  const { data: authors, isSuccess: isAuthorSuccess } = useFetchAuthorsQuery();
  const {
    data: books,
    isFetching: isBooksFetching,
    isLoading: isBooksLoading,
  } = useFetchBooksQuery(
    `?${
      filter ? "filter=genre&genre=" + filter + "&" : ""
    }limit=${offset}&page=${1}`
  );
  const { data: likedBooks, isLoading: isLikedBooksFetching } =
    useFetchBooksQuery(
      `?limit=${50}&filter=${"liked"}&userId=${user?._id || ""}`
    );

  const viewMore = () => {
    setOffset(offset + limit);
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

  const [addBookMutation, { isLoading: isAddBookLoading }] =
    useAddBookMutation();
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

      addBookMutation(fd)
        .unwrap()
        .then(() => {
          showSuccess("Book added");
          setFormState({
            ...formState,
            title: "",
            genre: "",
            author: "",
            synopsis: "",
            numOfChapter: "",
          });
          setPreview("");
          onAddModalClose();
        })
        .catch((err) => {
          console.log(err);
          showError(err?.data?.message || err?.message || "An error occurred");
        });
    }
  };

  return (
    <>
      <LayoutContainerWrapper asideChildren={<Aside />}>
        <Box mb={"24px"} minH={"100px"}>
          <Flex justify={"space-between"} align={"center"}>
            <Heading fontSize={"24px"} fontWeight={500}>
              My favorites
            </Heading>
            <Text
              _hover={{ textDecor: "underline" }}
              transition={".3s ease-out"}
              cursor={"pointer"}
              onClick={onAddModalOpen}
            >
              Add new book
            </Text>
          </Flex>
          {!isLikedBooksFetching && !likedBooks?.data?.length ? (
            <Text textAlign={"center"} color={"brand.textMuted"} my={"50px"}>
              Nothing to show here
            </Text>
          ) : (
            ""
          )}
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={4} mt={"10px"}>
            {likedBooks?.data?.map((book) => (
              <BookCardMini key={book?.id} book={book} />
            ))}
          </SimpleGrid>
          <Loader isLoading={isLikedBooksFetching} height="50px" />
        </Box>

        <Box>
          <Flex justify={"space-between"} flexWrap={"wrap"}>
            <Heading fontSize={"24px"} fontWeight={500}>
              Library
            </Heading>
            <Menu>
              <Flex gap={"10px"} align={"center"}>
                <Text>Genre:</Text>
                <MenuButton
                  as={Button}
                  variant={"link"}
                  color={"brand.black"}
                  fontWeight={400}
                  padding={0}
                  textTransform={"capitalize"}
                  rightIcon={<IoChevronDownOutline />}
                >
                  {genres?.filter((val) => val === filter)[0] || "All"}
                </MenuButton>
              </Flex>
              <MenuList>
                <MenuItem
                  bg={!filter ? "#EDF2F7" : ""}
                  textTransform={"capitalize"}
                  onClick={() => setFilter("")}
                >
                  All
                </MenuItem>
                {genres?.map((val, index) => (
                  <MenuItem
                    key={"menu-" + index}
                    bg={val === filter ? "#EDF2F7" : ""}
                    textTransform={"capitalize"}
                    onClick={() => setFilter(val)}
                  >
                    {val}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>

          {/* books */}
          <Box mt={"10px"}>
            {!isBooksFetching && !books?.data?.length ? (
              <Text textAlign={"center"} color={"brand.textMuted"} my={"100px"}>
                Nothing to show here
              </Text>
            ) : (
              ""
            )}
            <SimpleGrid
              columns={{
                base: isLargerThan550 ? 3 : 2,
                md: 3,
                lg: isSmallerThan1260 ? 3 : 4,
              }}
              gap={4}
            >
              {books?.data?.map((book) => (
                <BookCard key={book?._id} book={book} />
              ))}
            </SimpleGrid>
            <Loader isLoading={isBooksLoading} height="200px" />
            <Flex
              mt={"30px"}
              justify={"center"}
              display={offset >= (books?.total || 0) ? "none" : "flex"}
            >
              <Button
                w={["60%"]}
                colorScheme={"buttonPrimary"}
                onClick={viewMore}
                isLoading={isBooksFetching}
              >
                View more
              </Button>
            </Flex>
          </Box>
        </Box>

        <CustomModal
          isOpen={isAddModalOpen}
          onClose={onAddModalClose}
          title={"Add new book"}
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
              label="Title"
              name="title"
              value={formState.title}
              onChange={handleInputs}
            />
            <CustomDataListInput
              label="Genre"
              name="genre"
              value={formState.genre}
              onChange={handleInputs}
              list={genres || []}
              id={"genres"}
            />
            <Box>
              <FormLabel fontSize={"16px"} fontWeight={500}>
                Author
              </FormLabel>
              <CustomDropdown
                value={formState.author}
                itemOnClick={(val) =>
                  setFormState({ ...formState, author: val })
                }
                dropdownItems={authorItemArr}
              />
            </Box>
            <CustomInput
              label="Number of chapters"
              type="number"
              name="numOfChapter"
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
              isLoading={isAddBookLoading || isUploadFileLoading}
            >
              Add
            </Button>
          </Flex>
        </CustomModal>
      </LayoutContainerWrapper>
    </>
  );
};

const Aside = () => {
  const { data: featuredBooks } = useFetchBooksQuery(
    `?limit=${100}&filter=featured`
  );

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <Slider {...settings}>
        {featuredBooks?.data?.map((book) => (
          <FeaturedBookCardMini key={book?.id} book={book} />
        ))}
      </Slider>
    </>
  );
};

export default Library;
