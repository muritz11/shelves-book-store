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
  FormLabel,
} from "@chakra-ui/react";
import LayoutContainerWrapper from "../../components/dashboard/LayoutContainerWrapper";
import LotteryBg from "../../assets/images/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import {
  useDeleteReviewMutation,
  useFetchBookRatingsQuery,
  useFetchBooksQuery,
  useFetchSingleBooksQuery,
  useRateBookMutation,
  useToggleLikeMutation,
} from "../../redux/services/bookApi";
import { useEffect, useState } from "react";
import { showError, showSuccess } from "../../utils/Alert";
import BookColumnCard from "../../components/cards/BookColumnCard";
import { useFetchMeQuery } from "../../redux/services/accountApi";
import { capitalizeText } from "../../utils/helpers";
import RateStars from "../../utils/RateStars";
import { DateTime } from "luxon";
import CustomModal from "../../utils/CustomModal";
import CustomText from "../../utils/CustomText";
import Loader from "../../utils/Loader";

const ViewGame = () => {
  const { bid } = useParams();
  const [isSmallerThan1375] = useMediaQuery("(max-width: 1365px)");
  const [isLargerThan769] = useMediaQuery("(min-width: 769px)");
  const { data: user } = useFetchMeQuery();
  const {
    isOpen: isAuthorModalOpen,
    onOpen: onAuthorModalOpen,
    onClose: onAuthorModalClose,
  } = useDisclosure();
  // const book = Books[Number(bid) - 1];
  const { refetch: refetchLibBooks } = useFetchBooksQuery("?limit=12&page=1");
  const { refetch: refetchLikedBooks } = useFetchBooksQuery(
    `?limit=${50}&filter=${"liked"}&userId=${user?._id || ""}`
  );
  const {
    data: book,
    isLoading: isBookLoading,
    isError: isBookError,
    refetch: refetchBook,
  } = useFetchSingleBooksQuery(bid || "");
  const isBookLiked = book?.likes?.includes(user?._id || "");

  const { data: bookRating } = useFetchBookRatingsQuery(bid || "");

  let avgRating;
  if (!bookRating?.length) {
    avgRating = 0;
  } else {
    const totalRating = bookRating.reduce(
      (sum, ratingObj) => sum + ratingObj.rating,
      0
    );
    avgRating = totalRating / bookRating.length;
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (isBookError) {
      navigate(-1);
      showError("Could not fetch book");
    }
  }, [isBookError, navigate]);

  const [toggleLikedMutation, { isLoading: isToggleLikedLoading }] =
    useToggleLikeMutation();
  const toggleLiked = () => {
    toggleLikedMutation({ bookId: book?._id })
      .unwrap()
      .then((resp) => {
        showSuccess(resp?.message);
        refetchBook();
        refetchLibBooks();
        refetchLikedBooks();
      })
      .catch((err) => {
        console.log(err);
        showError(`Could not ${isBookLiked ? "unlike" : "like"} book`);
      });
  };

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
          <Flex gap={"10px"} direction={["column", "row"]} align={["center"]}>
            <Avatar
              src={book?.coverUrl || LotteryBg}
              bg={"brand.black"}
              boxSize={"120px"}
            />
            <Flex flexDir={"column"} gap={"5px"} textAlign={["center", "left"]}>
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
              <Flex gap={2} justify={["center", "flex-start"]}>
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
                    {avgRating}
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
              variant={isBookLiked ? "ghostDanger" : "danger"}
              alignSelf={"flex-start"}
              width={["full", "50%"]}
              onClick={toggleLiked}
              isLoading={isToggleLikedLoading}
            >
              {isBookLiked ? "Remove from favorites" : "Add to favorites"}
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
  const [formState, setFormState] = useState({
    rating: 0,
    review: "",
  });

  const { data: book } = useFetchSingleBooksQuery(bid || "");
  const { data: user } = useFetchMeQuery();
  const {
    data: bookRating,
    isLoading: isRatingsLoading,
    refetch: refetchRatings,
  } = useFetchBookRatingsQuery(bid || "");

  let avgRating;
  let alreadyReviewed = 0;
  if (!bookRating?.length) {
    avgRating = 0;
  } else {
    const totalRating = bookRating.reduce(
      (sum, ratingObj) => sum + ratingObj.rating,
      0
    );
    avgRating = totalRating / bookRating.length;

    alreadyReviewed = bookRating?.filter(
      (val) => val?.user?._id === user?._id
    )?.length;
  }

  const {
    isOpen: isReviewModalOpen,
    onOpen: onReviewModalOpen,
    onClose: onReviewModalClose,
  } = useDisclosure();

  const [deleteReviewMutation, { isLoading: isDeleteReviewLoading }] =
    useDeleteReviewMutation();
  const deleteReview = (rid: string) => {
    deleteReviewMutation(rid)
      .unwrap()
      .then(() => {
        showSuccess("Review deleted");
        refetchRatings();
      })
      .catch((err) => {
        showError(
          err?.message ||
            err?.error?.message ||
            "An error occurred, try again later"
        );
      });
  };

  const [rateBook, { isLoading: isRateBookLoading }] = useRateBookMutation();
  const submitReview = () => {
    rateBook({ bid, body: { ...formState } })
      .unwrap()
      .then(() => {
        showSuccess("Review submitted successfully");
        setFormState({
          rating: 0,
          review: "",
        });
        refetchRatings();
        onReviewModalClose();
      })
      .catch((err) => {
        showError(
          err?.message ||
            err?.error?.message ||
            "An error occurred, try again later"
        );
      });
  };

  return (
    <>
      <Box mb={7}>
        <Text fontWeight={500} mb={2} fontSize={"18px"}>
          Ratings and reviews
        </Text>
        {!isRatingsLoading ? (
          <Box>
            <Flex align={"center"} gap={2}>
              <Text fontWeight={500}>{avgRating}</Text>
              <RateStars rating={avgRating} />
              <Text fontSize={"12px"}>
                ({bookRating?.length} total ratings)
              </Text>
            </Flex>
            {bookRating?.map((rating) => {
              const dateTime = DateTime.fromISO(rating?.createdAt);
              // @ts-ignore
              const date = dateTime.toRelativeCalendar();

              return (
                <Box key={rating?._id}>
                  <Box as="hr" my={4} />
                  <Flex align={"center"} gap={2}>
                    <Avatar src={rating?.user?.coverUrl} boxSize={"28px"} />
                    <Text>{capitalizeText(rating?.user?.fullName)}</Text>
                    {rating?.user?._id === user?._id ? (
                      <Button
                        variant={"link"}
                        onClick={() => deleteReview(rating?._id)}
                        size={"xs"}
                        fontWeight={400}
                        color={"brand.danger"}
                        isLoading={isDeleteReviewLoading}
                      >
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}
                  </Flex>
                  <Flex align={"center"} gap={2} my={2}>
                    <RateStars mini={true} rating={rating?.rating} />
                    <Text fontSize={"12px"}>{date}</Text>
                  </Flex>
                  <Text fontSize={"14px"}>{rating?.review}</Text>
                </Box>
              );
            })}
            {!alreadyReviewed ? (
              <Button
                variant={"link"}
                width={"full"}
                onClick={onReviewModalOpen}
                mt={3}
                size={"sm"}
                fontWeight={400}
              >
                Write review
              </Button>
            ) : (
              ""
            )}
          </Box>
        ) : (
          ""
        )}
        <Loader isLoading={isRatingsLoading} height={"100px"} />
      </Box>
      <Box>
        <Text fontWeight={500} mb={2} fontSize={"18px"}>
          Other books by {capitalizeText(book?.author?.name || "")}
        </Text>
        {book?.authorsBooks
          ?.filter((val) => val?._id !== book?._id)
          ?.map((value) => (
            <BookColumnCard book={value} key={value?._id} />
          ))}
        {!book?.authorsBooks?.filter((val) => val?._id !== book?._id)
          ?.length ? (
          <Text color={"brand.textMuted"} fontSize={"14px"}>
            This author has no other publications
          </Text>
        ) : (
          ""
        )}
      </Box>

      <CustomModal
        isOpen={isReviewModalOpen}
        onClose={onReviewModalClose}
        title={"Write review"}
      >
        <Flex direction={"column"} gap={3}>
          <Box>
            <FormLabel fontSize={"16px"} fontWeight={500}>
              How would you rate this book
            </FormLabel>
            <RateStars
              rating={formState.rating}
              setRating={(val) => setFormState({ ...formState, rating: val })}
            />
          </Box>
          <CustomText
            label="Review"
            name="review"
            placeholder="Optional"
            value={formState.review}
            onChange={({ target }) => {
              setFormState({ ...formState, review: target.value });
            }}
          />
          <Button
            variant={"primary"}
            width={"full"}
            mt={5}
            mb={3}
            onClick={submitReview}
            isLoading={isRateBookLoading}
          >
            Submit
          </Button>
        </Flex>
      </CustomModal>
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
