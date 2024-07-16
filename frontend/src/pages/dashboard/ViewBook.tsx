import {
  Avatar,
  Flex,
  Text,
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useMediaQuery,
  Icon,
} from "@chakra-ui/react";
import LayoutContainerWrapper from "../../components/dashboard/LayoutContainerWrapper";
import LotteryBg from "../../assets/images/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import { useFetchSingleBooksQuery } from "../../redux/services/bookApi";
import { useEffect } from "react";
import { showError } from "../../utils/Alert";
import BookColumnCard from "../../components/cards/BookColumnCard";

const ViewGame = () => {
  const { bid } = useParams();
  const [isSmallerThan1375] = useMediaQuery("(max-width: 1365px)");
  const [isLargerThan769] = useMediaQuery("(min-width: 769px)");
  const {
    isOpen: isAuthorModalOpen,
    onOpen: onAuthorModalOpen,
    onClose: onAuthorModalClose,
  } = useDisclosure();
  const bookRating = 0;
  // const book = Books[Number(bid) - 1];
  const {
    data: book,
    isLoading: isBookLoading,
    isError: isBookError,
  } = useFetchSingleBooksQuery(bid || "");

  const navigate = useNavigate();
  useEffect(() => {
    if (isBookError) {
      navigate(-1);
      showError("Could not fetch book");
    }
  }, [isBookError, navigate]);

  return (
    <>
      <LayoutContainerWrapper
        asideChildren={<Aside />}
        mainWidth={{ base: "100%", md: "70%" }}
        asideWidth={{ base: "100%", md: "30%" }}
        isContentLoading={isBookLoading}
      >
        <Flex
          align={"center"}
          padding={"16px"}
          bg={"#F7F8FA"}
          rounded={"16px"}
          justify={["flex-start", "space-between"]}
          flexDir={[
            "column",
            isLargerThan769 && isSmallerThan1375 ? "column" : "row",
          ]}
          gap={"15px"}
        >
          <Flex gap={"10px"}>
            <Avatar
              src={book?.coverUrl || LotteryBg}
              bg={"brand.black"}
              boxSize={"120px"}
            />
            <Flex flexDir={"column"} gap={"5px"}>
              <Text
                fontSize={"20px"}
                fontWeight={700}
                textTransform={"capitalize"}
              >
                {book?.title}
              </Text>
              <Text fontSize={"12px"} fontWeight={500} color={"#787A80"}>
                authored by{" "}
                <Text
                  as="span"
                  textDecor={"underline"}
                  cursor="pointer"
                  onClick={onAuthorModalOpen}
                  textTransform={"capitalize"}
                >
                  {book?.author?.name}
                </Text>
              </Text>
              <Text
                fontSize={"12px"}
                rounded={"30px"}
                display={"inline"}
                color={"brand.textMuted"}
                fontWeight={500}
                textTransform={"capitalize"}
              >
                Genre: {book?.genre}
              </Text>
              <Flex gap={2}>
                <Flex
                  padding={"2px 5px"}
                  bg={"brand.secondaryTint"}
                  rounded={"30px"}
                  gap={"5px"}
                  align={"center"}
                  width={"max-content"}
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
                    {bookRating || 0}
                  </Text>
                </Flex>
                <Flex
                  padding={"2px 5px"}
                  bg={"brand.dangerTint"}
                  rounded={"30px"}
                  gap={"5px"}
                  align={"center"}
                  width={"max-content"}
                >
                  <Icon
                    as={FaHeart}
                    fontSize={["14px", "18px"]}
                    color={"brand.dangerDark"}
                  />
                  <Text
                    display={"inline-block"}
                    fontSize={"12px"}
                    color={"#48494D"}
                  >
                    {book?.likes?.length}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Box mt={"32px"}>
          <DisplayBox name="Chapters" value={`${book?.numOfChapter}`} />
          <DisplayBox name="Synopsis" value={book?.synopsis || ""} />

          <Flex
            justify={"space-between"}
            gap={2}
            direction={["column", "row"]}
            mt={10}
          >
            <Button
              size={"lg"}
              variant={"primary"}
              alignSelf={"flex-start"}
              width={["full", "50%"]}
            >
              Read
            </Button>
            <Button
              size={"lg"}
              variant={"danger"}
              alignSelf={"flex-start"}
              width={["full", "50%"]}
            >
              Add to favorites
            </Button>
          </Flex>
        </Box>
      </LayoutContainerWrapper>

      {/* Modal */}
      <Modal
        isOpen={isAuthorModalOpen}
        onClose={onAuthorModalClose}
        size={{ base: "xs", md: "sm" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent rounded={"16px"} bg={{ base: "#fff", md: "#fff" }}>
          <ModalCloseButton />
          <ModalBody py={"30px"} px={{ base: 4, md: 6 }} shadow={"md"}>
            <Flex
              direction={{ base: "column" }}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={{ base: 0, md: 5 }}
            >
              <Avatar
                boxSize={{ base: "100px" }}
                name={book?.author?.name}
                src={book?.author?.coverUrl}
                fontSize={"42px"}
                fontWeight={"semibold"}
                flexShrink={0}
              />
            </Flex>
            <Text
              fontSize={"18px"}
              fontWeight={500}
              textAlign={"center"}
              mt={4}
              mb={1}
            >
              Biography
            </Text>
            <Text>{book?.author?.bio}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

/*************************
 * Aside
 ************************/
const Aside = () => {
  const { bid } = useParams();

  const { data: book } = useFetchSingleBooksQuery(bid || "");

  return (
    <>
      <Box>
        <Text fontWeight={500} mb={3}>
          Other books by {book?.author?.name}
        </Text>
        {book?.authorsBooks?.map((value) => (
          <BookColumnCard book={value} key={value?._id} />
        ))}
      </Box>
    </>
  );
};

interface DisplayBoxProp {
  name: string;
  value: string | number;
  width?: string | string[];
}

const DisplayBox = ({ name, value, width = "full" }: DisplayBoxProp) => {
  return (
    <Box w={width} mt={"15px"}>
      <Text mb={"8px"} fontWeight={700}>
        {name}
      </Text>
      <Flex
        py={"8px"}
        px={"10px"}
        border={"1px solid #D3D4DA"}
        rounded={"8px"}
        justify={"space-between"}
        align={"center"}
      >
        {value}
      </Flex>
    </Box>
  );
};

export default ViewGame;
