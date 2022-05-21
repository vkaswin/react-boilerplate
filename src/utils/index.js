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
