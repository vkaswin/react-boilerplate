import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "redux/store";
import { ProvideAuth } from "hooks/useAuth";
import { Router } from "router";
import reportWebVitals from "./reportWebVitals";

import "assets/scss/index.scss";
import "bootstrap/dist/css/bootstrap.css";

const store = configureStore();

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ProvideAuth>
        <Router />
      </ProvideAuth>
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
