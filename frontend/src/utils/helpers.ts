import { showError } from "./Alert";

const capitalizeFirstText = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeText = (str: string) => {
  if (str === undefined) {
    return "";
  }

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const checkEmptyFields = (fields: any) => {
  let err = false;
  Object.keys(fields).forEach((key: string) => {
    if (
      fields[key] === "" ||
      fields[key] === undefined ||
      fields[key] === null
    ) {
      showError(capitalizeFirstText(`${key?.replace(/_/g, " ")} is required`));
      err = true;
    }
  });

  return err;
};

export const truncateText = (text: string, maxLength: number) => {
  if (text?.length <= maxLength) {
    return text;
  } else {
    return text?.substring(0, maxLength) + "...";
  }
};

export const countWords = (str: string) => {
  if (!str.trim()) {
    return 0;
  }

  return str?.trim()?.split(/\s+/).length;
};
