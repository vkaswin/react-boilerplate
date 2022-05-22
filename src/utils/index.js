import { Toast } from "components/Toast";

export const toast = ({ type, message, delay, position, closeIcon }) => {
  Toast({
    type,
    message,
    delay,
    position,
    closeIcon,
  });
};

export const debounce = (fn, delay) => {
  let timeoutID;
  return (...args) => {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const setCookie = ({ name, value, days }) => {
  let expireDate = new Date();
  expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000);
  let expires = "; expires=" + expireDate.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/";
};

export const getCookie = (name) => {
  let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) {
    return match[2];
  } else {
    return null;
  }
};

export const clearCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const parseQuery = (query = "") => {
  return query
    .substring(1)
    .split("&")
    .filter(Boolean)
    .reduce((initial, str) => {
      const [key, value] = str.split("=");
      return { ...initial, [key]: value };
    }, {});
};

export const stringifyQuery = (query = {}) => {
  return Object.entries(query)
    .reduce(
      (initial, [key, value]) =>
        `${initial}${
          typeof value !== "undefined" && value !== null
            ? `${key}=${value}&`
            : ""
        }`,
      "?"
    )
    .slice(0, -1);
};
