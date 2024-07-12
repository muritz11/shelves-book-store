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
  Heading,
  Icon,
} from "@chakra-ui/react";
import LayoutContainerWrapper from "../../components/dashboard/LayoutContainerWrapper";
import LotteryBg from "../../assets/images/logo.png";
import { useParams } from "react-router-dom";
import { Books } from "../../redux/data";
import { FaStar } from "react-icons/fa";

const ViewGame = () => {
  const { bid } = useParams();
  const [isSmallerThan1375] = useMediaQuery("(max-width: 1365px)");
  const [isLargerThan769] = useMediaQuery("(min-width: 769px)");
  const {
    isOpen: isGMModalOpen,
    onOpen: onGMModalOpen,
    onClose: onGMModalClose,
  } = useDisclosure();
  const book = Books[Number(bid) - 1];

  return (
    <>
      <LayoutContainerWrapper
        asideChildren={<Aside />}
        mainWidth={{ base: "100%", md: "70%" }}
        asideWidth={{ base: "100%", md: "30%" }}
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
                  onClick={onGMModalOpen}
                  textTransform={"capitalize"}
                >
                  {book?.author}
                </Text>
              </Text>
              <Text
                rounded={"30px"}
                display={"inline"}
                color={"brand.textMuted"}
                fontWeight={500}
                textTransform={"capitalize"}
              >
                Genre: {book?.genre}
              </Text>
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
                  {book?.rating || 0}
                </Text>
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
              variant={"light"}
              alignSelf={"flex-start"}
              width={["full", "50%"]}
            >
              Add to my list
            </Button>
          </Flex>
        </Box>
      </LayoutContainerWrapper>

      {/* Modal */}
      <Modal
        isOpen={isGMModalOpen}
        onClose={onGMModalClose}
        size={{ base: "xs", md: "md" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent rounded={"16px"} bg={{ base: "#fff", md: "#fff" }}>
          <ModalCloseButton />
          <ModalBody py={"30px"} px={{ base: 4, md: 6 }} shadow={"md"}>
            <Flex
              direction={{ base: "column", md: "row" }}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={{ base: 0, md: 5 }}
            >
              <Avatar
                boxSize={{ base: "100px", md: "120px" }}
                name={book?.author}
                src={""}
                fontSize={"42px"}
                fontWeight={"semibold"}
                flexShrink={0}
              />

              <Flex
                flexDirection="column"
                gap="10px"
                w={{ base: "100%", md: "calc(100% - 140px)" }}
              >
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  direction={{ base: "column", md: "row" }}
                  gap={1}
                >
                  <Heading
                    fontSize={{ base: "20px" }}
                    fontWeight={700}
                    textAlign={{ base: "center", lg: "left" }}
                    textTransform={"capitalize"}
                    mt={{ base: "10px", lg: "0" }}
                  >
                    {book?.author}
                  </Heading>
                </Flex>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  bg={"#f3f3f3"}
                  border={"1px solid #E1E2E5"}
                  py={"15px"}
                  px={"27px"}
                  borderRadius={"100px"}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"17px"} fontWeight={"semibold"}>
                      {0}
                    </Text>
                    <Text
                      whiteSpace={"nowrap"}
                      fontSize={{ base: "14px", lg: "14px" }}
                    >
                      Books published
                    </Text>
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"17px"} fontWeight={"semibold"}>
                      {0}
                    </Text>
                    <Text
                      whiteSpace={"nowrap"}
                      fontSize={{ base: "14px", lg: "14px" }}
                    >
                      Awards
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
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
  return <></>;
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
