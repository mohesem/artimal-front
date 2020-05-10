import React, { useState, useEffect } from "react";
import notification from "helpers/notification";
// reactstrap components
import {
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Spinner,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";

// api
import ApiPost from "API/post";

export default (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [role, setRole] = useState();
  const [roleError, setRoleError] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [onHold, setOnHold] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  const validate = () => {
    return new Promise((resolve, reject) => {
      const errors = [];
      if (!role) {
        errors.push({
          role: "ورود نقش کاربر برای ثبت کابر جدید الزامی است",
        });
      }

      if (!username) {
        errors.push({
          username: "ورود نام کاربری برای ثبت کاربر جدید الزامی است",
        });
      } else if (username.length < 4) {
        errors.push({
          username: "نام کاربری باید حداقل ۵ کاراکتر داشته باشد",
        });
      }

      if (!password) {
        errors.push({
          password: "ورود پسورد برای ثبت کاربر جدید الزامی است",
        });
      } else if (password.length < 4) {
        errors.push({
          password: "پسورد باید حداقل ۵ کاراکتر داشته باشد",
        });
      }

      if (errors.length) reject(errors);
      resolve();
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                   effects                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleSubmit = () => {
    setOnHold(true);
    setRoleError("");
    setUsernameError("");
    setPasswordError("");
    validate()
      .then(() => {
        const data = {
          entry: {
            role,
            username,
            password,
          },
          token: localStorage.artimal,
        };

        ApiPost("api/v0/user", data)
          .then((res) => {
            console.log(res);
            notification(res.result, "success");
          })
          .catch((err) => {
            console.log(err);
            if (err.error && err.error.username) {
              setUsernameError(err.error.username);
            } else if (err.error) {
              notification(err.error, "danger");
            } else {
              notification("سرور در دسترس نمیباشد", "danger");
            }
          })
          .finally(() => {
            setOnHold(false);
          });
      })
      .catch((errors) => {
        errors.forEach((err) => {
          const key = Object.keys(err)[0];
          if (key === "role") setRoleError(err.role);
          if (key === "username") setUsernameError(err.username);
          if (key === "password") setPasswordError(err.password);
        });
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                                   return                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <Card className="demo-icons">
      <CardHeader>
        <CardTitle tag="h6">ایجاد کاربر جدید</CardTitle>
      </CardHeader>
      <CardBody>
        <FormGroup>
          <Label>نقش</Label>
          <div style={{ display: "flex" }}>
            <FormGroup check>
              <Label check>
                <span>ادمین</span>
                <Input
                  type="radio"
                  onChange={() => setRole(1)}
                  checked={role === 1}
                />
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <span>کابر</span>
                <Input
                  type="radio"
                  onChange={() => setRole(2)}
                  checked={role === 2}
                />
              </Label>
            </FormGroup>
          </div>
          <p className="error-text-form">{roleError}</p>
        </FormGroup>
        <FormGroup>
          <Label>نام کاربری</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <p className="error-text-form">{usernameError}</p>
        </FormGroup>

        <FormGroup>
          <Label>پسورد</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <p className="error-text-form">{passwordError}</p>
        </FormGroup>
        <FormGroup>
          <Button type="button" color="primary" onClick={handleSubmit}>
            {onHold ? <Spinner size="sm" color="light" /> : "تایید"}
          </Button>
        </FormGroup>
      </CardBody>
    </Card>
  );
};
