const validateEmail = (email: string): Boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value);
const noSpaces = (value: string) => !/ /g.test(value);

const dateFormat: string = "dd.MM.yyyy";
const shortDateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "numeric",
};

export { validateEmail, onlyAllowNumber, noSpaces, dateFormat, shortDateOptions };
