import { Flex, Heading, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Flex
      flexDirection={"column"}
      justify={"center"}
      height={"100vh"}
      align={"center"}
      id="error-page"
    >
      <Heading>Oops!</Heading>
      <Text my={2}>Sorry, Something seems to be wrong.</Text>
      <Text color={"brand.textMuted"}>
        {error.status === 404 ? (
          <i>Page not Found</i>
        ) : (
          <i>{error.statusText || error.message}</i>
        )}
      </Text>
    </Flex>
  );
}
