import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useSearchQuery } from "../../redux/services/fileApi";
import BookCard from "../../components/cards/BookCard";
import Loader from "../../utils/Loader";
import { AuthorObj } from "../../redux/types";
import BookColumnCard from "../../components/cards/BookColumnCard";

export const useQuery = () => {
  const [searchParams] = useSearchParams();
  const query: any = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });
  return query;
};

const Search = () => {
  const [isSmallerThan1260] = useMediaQuery("(max-width: 1260px)");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");
  const query = useQuery();

  const { data: searchResult, isFetching: isSearchLoading } = useSearchQuery(
    query?.query
  );
  return (
    <>
      {/* empty state */}
      <Flex
        height={"300px"}
        justify={"center"}
        align={"center"}
        display={query?.query ? "none" : "flex"}
        color={"brand.textMuted"}
      >
        Type query in search box and hit enter to search
      </Flex>

      {/* search result */}
      <Box
        padding={[3, 7]}
        pt={[6, 10]}
        display={query?.query ? "block" : "none"}
      >
        <Heading as="h3" fontSize={"24px"}>
          Showing search result for {query?.query}:
        </Heading>
        <Loader isLoading={isSearchLoading} height="200px" />
        {!isSearchLoading &&
        !searchResult?.data?.books?.length &&
        !searchResult?.data?.authors?.length ? (
          <Text textAlign={"center"} color={"brand.textMuted"} my={"100px"}>
            You query returned no result
          </Text>
        ) : (
          ""
        )}
        {!isSearchLoading &&
        (searchResult?.data?.books?.length ||
          searchResult?.data?.authors?.length) ? (
          <>
            <Box
              mt={5}
              display={searchResult?.data?.books?.length ? "block" : "none"}
            >
              <Text fontWeight={500} fontSize={"20px"} mb={3}>
                Books
              </Text>
              <SimpleGrid
                columns={{
                  base: isLargerThan550 ? 3 : 2,
                  md: 3,
                  lg: isSmallerThan1260 ? 3 : 4,
                }}
                gap={4}
              >
                {searchResult?.data?.books?.map((book) => (
                  <BookCard key={book?._id} book={book} />
                ))}
              </SimpleGrid>
            </Box>
            <Box
              mt={10}
              display={searchResult?.data?.authors?.length ? "block" : "none"}
            >
              <Text fontWeight={500} fontSize={"20px"} mb={3}>
                Authors
              </Text>
              <Flex
                gap={5}
                justify={["space-evenly", "flex-start"]}
                flexWrap={"wrap"}
              >
                {searchResult?.data?.authors?.map((author) => (
                  <AuthorCard author={author} />
                ))}
              </Flex>
            </Box>
          </>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

const AuthorCard = ({ author }: { author: AuthorObj }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        justify={"center"}
        align={"center"}
        direction={"column"}
        gap={3}
        onClick={onOpen}
        cursor={"pointer"}
        rounded={"8px"}
        padding={2}
        _hover={{ bg: "brand.lightGrey" }}
      >
        <Avatar boxSize={"80px"} src={author?.coverUrl} />
        <Text
          textTransform={"capitalize"}
          textAlign={"center"}
          fontWeight={500}
        >
          {author?.name}
        </Text>
      </Flex>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", md: "sm" }}
        scrollBehavior={"inside"}
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
                name={author?.name}
                src={author?.coverUrl}
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
            <Text>{author?.bio}</Text>
            <Box mt={5}>
              <Text
                mb={2}
                fontSize={"16px"}
                textAlign={"center"}
                fontWeight={500}
              >
                Publications
              </Text>
              {author?.books?.map((value) => (
                <BookColumnCard book={value} key={value?._id} />
              ))}
              {!author?.books?.length ? (
                <Text textAlign={"center"} color={"brand.textMuted"} mb={7}>
                  No publications yet
                </Text>
              ) : (
                ""
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
