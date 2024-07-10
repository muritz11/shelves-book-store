import { ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import Routes from "./route/Routes";
import theme from "./theme";

const App = () => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={Routes()} />
    </>
  );
};

export default App;
