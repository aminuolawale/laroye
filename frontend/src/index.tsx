import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const googleOauthClientId = process.env
  .REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string;
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleOauthClientId}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
