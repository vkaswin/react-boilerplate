export const useCookies = () => {
  const setCookie = ({ name, value, days }) => {
    let expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000);
    let expires = "; expires=" + expireDate.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
  };

  const getCookie = (name) => {
    let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) {
      return match[2];
    } else {
      return null;
    }
  };

  const clearCookie = (name) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  return {
    setCookie: setCookie,
    getCookie: getCookie,
    clearCookie: clearCookie,
  };
};
