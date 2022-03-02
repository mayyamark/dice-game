import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apollo";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
