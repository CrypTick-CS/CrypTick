import React from 'react';
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, authenticated }) {
  return (
    <Route
      render={() =>
        authenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;