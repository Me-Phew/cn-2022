import type { AxiosError, AxiosResponse } from "axios";

interface RequestResponse extends AxiosResponse {
  data: {
    message: string;
  };
}

const handleRequestError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response as RequestResponse;
  }
  if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    throw error;
  }
  // Something happened in setting up the request that triggered an Error
  throw error;
};

const validateEmail = (email: string): Boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value);
const noSpaces = (value: string) => !/ /g.test(value);

const dateFormat: string = "dd.MM.yyyy";
const shortDateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "numeric",
};

export {
  validateEmail,
  onlyAllowNumber,
  noSpaces,
  dateFormat,
  shortDateOptions,
  handleRequestError,
};
