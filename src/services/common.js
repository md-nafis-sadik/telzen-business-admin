import moment from "moment";
import { envConfig } from "./config";
import { TimestampConvertTypeEnum } from "./enum";
const mapKey = envConfig.mapApiKey;

const checkEmailValidity = (email) => {
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  } else {
    return false;
  }
};

const strongPasswordRgx = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

const maskedArray = (number = "") => {
  if (number)
    return number
      .split(" ")
      .map((segment, index, arr) =>
        index === arr.length - 1 ? "XX" + segment.slice(-2) : "XXXX",
      );
  else return [];
};

const formattedPhoneNumber = (event) => {
  const value = event.target.value;
  let phoneNumber = value.replace(/\D/g, "");
  let formattedNumber = "";

  for (let i = 0; i < phoneNumber.length; i++) {
    if (i === 3 || i === 6) {
      formattedNumber += "-";
    }
    formattedNumber += phoneNumber[i];
  }

  return formattedNumber;
};

const getStringTime = (time = "") => {
  if (time && time !== "-") {
    const timestamp =
      time?.toString()?.length > 10 ? parseInt(time) / 1000 : parseInt(time);
    const stringTime = moment.unix(timestamp).format("hh:mm A");
    return stringTime;
  } else {
    return "-";
  }
};

const getTimeFromDate = (date) => {
  const formattedDate = new Date(date);
  const formattedTime = moment(formattedDate).format("hh:mm A");
  return formattedTime;
};

const getCapitalFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const getSerialNumber = ({ currentPage = 0, rowsPerPage = 0, index = 0 }) => {
  const serialNumber =
    currentPage === 1 && index + 1 < 10
      ? "0" + (rowsPerPage * (currentPage - 1) + index + 1)
      : rowsPerPage * (currentPage - 1) + index + 1;
  return serialNumber;
};

function getStringDate(value) {
  if (value) {
    const date =
      value.toString().length > 10 ? parseInt(value) / 1000 : parseInt(value);
    const formattedDate = moment.unix(date).format("MMM DD, YYYY");
    return formattedDate;
  } else {
    return "";
  }
}

function arrayToCommaSeparated(arr) {
  if (!Array.isArray(arr)) return "";
  return arr.join(", ");
}

const filterUndefined = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
};

const timestampConverter = (timestamp, type) => {
  if (!timestamp) return null;

  if (type === TimestampConvertTypeEnum.To_Unix)
    return moment(timestamp).unix();

  if (type === TimestampConvertTypeEnum.From_Unix_To_MMM_DD_YYYY)
    return moment.unix(timestamp).format("MMM DD, YYYY");
};

const getCustomerFileNameFromUrl = (url) => {
  if (!url) return ""; // or return null, or a fallback name
  return url.split("/").pop();
};

const roleOptions = [{ id: "manager", name: "Manager" }];

const roleLabelMap = {
  manager: "Manager",
  "super-admin": "Super Admin",
};

export {
  arrayToCommaSeparated,
  checkEmailValidity,
  debounce,
  filterUndefined,
  formattedPhoneNumber,
  getCapitalFirstLetter,
  getCustomerFileNameFromUrl,
  getSerialNumber,
  getStringDate,
  getStringTime,
  getTimeFromDate,
  maskedArray,
  roleLabelMap,
  roleOptions,
  strongPasswordRgx,
  timestampConverter,
};
