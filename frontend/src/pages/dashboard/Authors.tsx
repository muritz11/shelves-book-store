import React from "react";
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
import { Link } from "react-router-dom";
import { AuthorObj } from "../../redux/types";
import { HiMiniTrash } from "react-icons/hi2";
import { TiEye } from "react-icons/ti";
import { authors } from "../../redux/data";
import CustomPrompt from "../../utils/CustomPrompt";

const Authors = () => {
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
                <Th textAlign="right" pr={1}>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {authors?.map((val) => (
                <RowItem key={val?.id} val={val} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

const RowItem = ({ val }: { val: AuthorObj }) => {
  const {
    isOpen: isDelModalOpen,
    onOpen: onDelModalOpen,
    onClose: onDelModalClose,
  } = useDisclosure();

  return (
    <>
      <Tr>
        <Td>
          <Flex align={"center"} gap={2}>
            <Avatar src={val?.coverUrl} boxSize={"33px"} />
            <Text textTransform={"capitalize"}>{`${val?.name}`}</Text>
          </Flex>
        </Td>
        <Td pr={1}>
          <Flex align={"center"} justify={"flex-end"} gap={"10px"}>
            <Flex
              as={Link}
              align={"center"}
              to={`/admin/translators/update/${val?.id}`}
            >
              <Icon
                as={TiEye}
                color={"root.primary"}
                fontSize={"17px"}
                cursor={"pointer"}
              />
            </Flex>
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
        primaryBtnAction={() => null}
        isActionLoading={false}
      />
    </>
  );
};

export default Authors;
