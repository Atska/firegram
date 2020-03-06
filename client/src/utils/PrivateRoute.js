import React from "react";
import authenticated from "./auth"
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (authenticated() === true) {
    console.log("true")
  } else {
    console.log("false")
  }
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

// https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
