import React, { useState } from 'react'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  isLogedIn = false,
  componentProps,
  path,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogedIn ? (
          <Component {...props} {...componentProps} />
        ) : (
          <Redirect
            push
            to={{
              pathname: "/login",
              state: { referrer: rest.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;