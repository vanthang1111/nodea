import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = window.localStorage.getItem("userInfo");
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default PrivateRouter;
