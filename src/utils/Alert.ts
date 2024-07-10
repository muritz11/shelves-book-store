import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

export const showSuccess = (msg: string) => {
  toast({
    position: "top-right",
    title: msg,
    status: "success",
    duration: 5000,
    isClosable: true,
  });
};

export const showError = (msg: string) => {
  toast({
    position: "top-right",
    title: msg,
    status: "error",
    duration: 5000,
    isClosable: true,
  });
};

export const showWarning = (msg: string) => {
  toast({
    position: "top-right",
    title: msg,
    status: "error",
    duration: 5000,
    isClosable: true,
  });
};
