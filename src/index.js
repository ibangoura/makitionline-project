// src/index.js

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "./index.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import App from "./App";

// Example backend call function
const testBackendConnection = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/hello", {
      method: "GET",
      credentials: "include", // Include cookies if backend uses them
    });
    const data = await response.json();
    console.log("Backend response:", data.message);
  } catch (error) {
    console.error("Error connecting to backend:", error);
  }
};

// Root component wrapper to run side effects on app start
const Root = () => {
  useEffect(() => {
    testBackendConnection();
  }, []);

  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
