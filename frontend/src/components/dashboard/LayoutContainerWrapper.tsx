import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import Loader from "../../utils/Loader";

interface WrapperProps {
  children: ReactNode;
  asideChildren?: ReactNode;
  mainWidth?: any;
  asideWidth?: any;
  noAside?: boolean;
  isContentLoading?: boolean;
}

const LayoutContainerWrapper = ({
  children,
  asideChildren,
  mainWidth = { base: "100%", md: "70%" },
  asideWidth = { base: "100%", md: "30%" },
  noAside = false,
  isContentLoading,
}: WrapperProps) => {
  return (
    <>
      {isContentLoading ? (
        <Loader isLoading={true} height="70vh" />
      ) : (
        <Flex flexDir={{ base: "column", md: "row" }}>
          <Box
            w={noAside ? "100%" : mainWidth}
            px={{ base: "15px", md: "32px" }}
            py={"32px"}
            mb={{ base: "50px" }}
          >
            {children}
          </Box>
          {/* aside */}
          {!noAside ? (
            <Flex
              as="aside"
              flexDir={"column"}
              gap={"24px"}
              bg={"brand.lighterGrey"}
              minH={{ base: "200px", md: "100vh" }}
              w={asideWidth}
              padding={{ base: "32px 15px", md: "32px 20px" }}
            >
              {asideChildren}
            </Flex>
          ) : (
            ""
          )}
        </Flex>
      )}
    </>
  );
};

export default LayoutContainerWrapper;
