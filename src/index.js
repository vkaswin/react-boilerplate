import { Fragment, StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "redux/store";
import { ProvideAuth } from "hooks/useAuth";
import { Router } from "router";
import { useAuth } from "hooks";
import { ToastContainer } from "components";
import reportWebVitals from "./reportWebVitals";

import "assets/scss/index.scss";

const store = configureStore();

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

const App = () => {
  const auth = useAuth();

  const { onLogout } = auth;

  useEffect(() => {
    window.cookieStore.onchange = ({ deleted = [] }) => {
      let isAuthToken =
        deleted.find(({ name }) => name === "authToken") ?? false;
      if (isAuthToken) {
        onLogout();
      }
    };
    return () => {
      window.cookieStore.onchange = null;
    };
  }, []);

  return (
    <Fragment>
      <Router {...{ auth }} />
      <ToastContainer />
    </Fragment>
  );
};

root.render(
  <StrictMode>
    <Provider store={store}>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
