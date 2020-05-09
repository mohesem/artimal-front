import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/actions";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

//import signinApi from "../API/signin";
import ApiPost from "API/post";

export default () => {
  const dispatch = useDispatch();
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameErrors, setUsernameErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const [otherError, setOtherError] = useState("");

  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const [serverError, setServerError] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleSubmit = () => {
    const usernameErr = {};
    const passwordErr = {};

    if (!username.length && !usernameErrors.isRequired) {
      usernameErr.isRequired = "ورود نام کاربری الزامی است";
    }
    if (username.length && usernameErrors.isRequired) {
      delete usernameErrors.isRequired;
    }

    if (!password.length && !passwordErrors.isRequired) {
      passwordErr.isRequired = "ورود پسورد الزامی است";
    }
    if (password.length && passwordErrors.isRequired) {
      delete passwordErrors.isRequired;
    }

    if (Object.keys(usernameErr).length) setUsernameErrors({ ...usernameErr });
    if (Object.keys(passwordErr).length) setPasswordErrors({ ...passwordErr });
    if (!Object.keys(usernameErr).length && !Object.keys(passwordErr).length) {
      const data = { username, password };
      ApiPost("api/v0/user/login", data)
        .then((res) => {
          console.log(res);
          localStorage.setItem("artimal", res.token);
          dispatch(userAction({ authenticated: true }));
        })
        .catch((e) => {
          console.log("error is :: ", e);
          if (e.hasOwnProperty("error")) {
            setServerError(e.error);
            setOtherError("");
          } else {
            setOtherError("خطا در برقراری ارتباط با سرور");
          }
        });
      // TODO: send request to server and get new tokens
      // TODO: set global user to true
    }
  };

  const handleErrors = () => {
    const usernameErr = {};
    const passwordErr = {};

    if (touched.username && !username.length && !usernameErrors.isRequired) {
      usernameErr.isRequired = "ورود نام کاربری الزامی است";
    }
    if (username.length && usernameErrors.isRequired) {
      delete usernameErrors.isRequired;
    }

    if (touched.password && !password.length && !passwordErrors.isRequired) {
      passwordErr.isRequired = "ورود پسورد الزامی است";
    }
    if (password.length && passwordErrors.isRequired) {
      delete passwordErrors.isRequired;
    }

    if (Object.keys(usernameErr).length) setUsernameErrors({ ...usernameErr });
    if (Object.keys(passwordErr).length) setPasswordErrors({ ...passwordErr });
  };

  handleErrors();

  return (
    <>
      <div className="container login-page-c">
        <Card className="card-user">
          <CardHeader>
            <CardTitle tag="h5">ورود</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col className="px-1">
                  <FormGroup>
                    <label>نام کاربری</label>
                    <Input
                      placeholder="نام کاربری خود را وارد کنید"
                      type="text"
                      value={username}
                      onChange={(e) => {
                        if (!touched.username) {
                          setTouched({ ...touched, username: true });
                        }
                        setUsername(e.target.value);
                      }}
                    />
                  </FormGroup>
                  {Object.keys(usernameErrors).map((v, i) => {
                    return (
                      <p className="error-text-form" key={`username${i}`}>
                        {usernameErrors[v]}
                      </p>
                    );
                  })}
                </Col>
              </Row>
              <Row>
                <Col className="px-1">
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">پسورد</label>
                    <Input
                      placeholder="پسورد خود را وارد کنید"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        if (!touched.password) {
                          setTouched({ ...touched, password: true });
                        }
                        setPassword(e.target.value);
                      }}
                    />
                  </FormGroup>
                  {Object.keys(passwordErrors).map((v, i) => {
                    return (
                      <p className="error-text-form" key={`password${i}`}>
                        {passwordErrors[v]}
                      </p>
                    );
                  })}
                </Col>
              </Row>

              <Row>
                <div className="update ml-auto mr-auto">
                  <Button
                    className="btn-wd"
                    color="primary"
                    type="button"
                    onClick={handleSubmit}
                  >
                    تایید
                  </Button>
                </div>
              </Row>
              <Row>
                <p className="error-text-form">{serverError}</p>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
