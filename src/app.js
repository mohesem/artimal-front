import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactNotification from "react-notifications-component";

import AdminLayout from "layouts/Admin.jsx";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Login from "views/Login.jsx";

// api
// import isVerifiedApi from "./API/verify";
import ApiGet from "API/get";

// actions
import { userAction } from "./redux/actions";

const hist = createBrowserHistory();

export default () => {
  const dispatch = useDispatch();
  const userReducer = useSelector((global) => global.user);
  console.log(userReducer);

  useEffect(() => {
    if ((userReducer.authenticated === null, localStorage.artimal)) {
      ApiGet(`api/v0/user/token/${localStorage.artimal}`)
        .then((user) => {
          dispatch(userAction({ authenticated: true, role: user.result.role }));
          // TODO: show error somewhere on app
        })
        .catch((err) => {
          // TODO: show error somewhere on app
          console.log(err);
          dispatch(userAction({ authenticated: false }));
        });
    } else {
      dispatch(userAction({ authenticated: false }));
    }
  }, [dispatch, userReducer.authenticated]);

  return (
    <>
      <ReactNotification />
      {userReducer.authenticated === null ? null : (
        <Router history={hist}>
          {!userReducer.authenticated ? (
            <Login />
          ) : (
            <>
              <Switch>
                <Route
                  path="/admin"
                  render={(props) => <AdminLayout {...props} />}
                />
                <Redirect to="/admin/dashboard" />
              </Switch>
            </>
          )}
        </Router>
      )}
    </>
  );
};
