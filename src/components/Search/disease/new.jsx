import React, { useState } from "react";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import notifications from "helpers/notification";
import { Typeahead } from "react-bootstrap-typeahead";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

// api
// import createDiseaseApi from "API/disease/create";
import ApiPost from "API/post";

// default values
const diseaseOptions = [
  "سل گاوی",
  "آنتروتوکسمی",
  "شاربن",
  "بروسلوز",
  "آبله ی گوسفندی",
  "آگالاکسی",
  "هاری",
  "تب برفکی",
];
export default (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */

  const [date, setDate] = useState(momentJalaali());
  const [disease, setDisease] = useState([]);
  const [diseaseError, setDiseaseError] = useState("");
  const [comment, setComment] = useState("");
  //   const [commentError, setCommentError] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                                  handlres                                  */
  /* -------------------------------------------------------------------------- */

  const handleSubmit = () => {
    if (disease.length) {
      const data = {
        entry: {
          date,
          createdAt: momentJalaali(),
          value: disease,
          key: props.animalKey,
          comment,
        },
        token: localStorage.artimal,
      };

      console.log(data);
      // createDiseaseApi(data)
      ApiPost("api/v0/disease", data)
        .then((res) => {
          console.log(res);
          notifications(res.result, "success");
          setDisease([]);
          setComment("");
          props.forceUpdate();
        })
        .catch((err) => {
          console.log(err);
          notifications(err.error, "danger");
        });
    } else {
      setDiseaseError("ورود بیماری الزامی است");
    }
  };

  return (
    <Card className="demo-icons">
      <CardHeader>
        <CardTitle tag="h6">اضافه کردن رکورد جدید</CardTitle>
      </CardHeader>
      <CardBody>
        <FormGroup>
          <Label>تاریخ</Label>
          <FormGroup>
            <DatePicker
              isGregorian={false}
              timePicker={false}
              value={date}
              onChange={(value) => setDate(value)}
            />
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <Label>بیماری</Label>
          <Typeahead
            className="typeahead"
            id="vaccine-typeahead"
            labelKey="name"
            onChange={setDisease}
            options={diseaseOptions}
            placeholder="بیماری را انتخاب کنید"
            selected={disease}
          />
          <p className="error-text-form">{diseaseError}</p>
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">توضیحات</Label>
          <Input
            type="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {/* <p className="error-text-form">{deathCommentError}</p> */}
        </FormGroup>
        <FormGroup>
          <Button type="button" color="primary" onClick={handleSubmit}>
            تایید
          </Button>
        </FormGroup>
      </CardBody>
    </Card>
  );
};
