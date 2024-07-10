import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    /* Regular Satoshi Font */
    @font-face {
      font-family: "Satoshi";
      src: url("./fonts/Satoshi-Regular.woff") format("woff");
      font-weight: normal;
      font-style: normal;
    }
    
    /* Bold Satoshi Font */
    @font-face {
      font-family: "Satoshi";
      src: url("./fonts/Satoshi-Bold.woff") format("woff");
      font-weight: bold;
      font-style: normal;
    }
    
    /* Italic Satoshi Font */
    @font-face {
      font-family: "Satoshi";
      src: url("./fonts/Satoshi-Italic.woff") format("woff");
      font-weight: normal;
      font-style: italic;
    }
    
    /* Bold Italic Satoshi Font */
    @font-face {
      font-family: "Satoshi";
      src: url("./fonts/Satoshi-BoldItalic.woff") format("woff");
      font-weight: bold;
      font-style: italic;
    }
    
    @font-face {
      font-family: "Satoshi";
      src: url("./fonts/Satoshi-Medium.woff") format("woff");
      font-weight: 500;
      font-style: normal;
    }
    
      `}
  />
);

export default Fonts;
