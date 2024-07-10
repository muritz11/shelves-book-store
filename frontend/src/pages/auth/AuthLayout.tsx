import { ReactNode } from "react";
import { Flex, Heading, Image, Text, Box } from "@chakra-ui/react";
import Logo from "../../assets/images/logo.png";

interface LayoutProps {
  children: ReactNode;
  heading?: string;
  subHeading?: ReactNode;
  animateLogo?: boolean;
  //   logoReplacement?: string;
}

const AuthLayout = ({
  children,
  heading,
  subHeading,
  animateLogo = false,
}: //   logoReplacement,
LayoutProps) => {
  return (
    <Flex justify={"center"} align={"center"} minH={"100vh"}>
      <Box width={{ base: "90%", md: "550px" }} py={"50px"} mt={"40px"}>
        <Flex
          position={"absolute"}
          top={[0, "15px"]}
          left={[0, "40px"]}
          align={"center"}
        >
          <Image
            src={Logo}
            className={animateLogo ? "animateLogo" : ""}
            height={["100px", "150px"]}
            alt="logo"
          />
        </Flex>
        <Box my="32px">
          <Heading
            as={"h2"}
            fontSize="24px"
            fontWeight={700}
            textAlign={"center"}
          >
            {heading}
          </Heading>
          {subHeading ? (
            <Text textAlign={"center"} mt={"8px"}>
              {subHeading}
            </Text>
          ) : (
            ""
          )}
        </Box>

        {children}
      </Box>
    </Flex>
  );
};

export default AuthLayout;
