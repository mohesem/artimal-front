import React, { useState } from "react";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import { Typeahead } from "react-bootstrap-typeahead";
import notification from "../../helpers/notification";
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
// import putVaccineApi from "API/vaccine/put";
import ApiPost from "API/post";

const vaccineOptions = [
  "آنتروتوکسمی",
  "تب برفکی",
  "بروسلوز",
  "آگالاکسی",
  "شاربن",
  "آبله",
  "طاعون نشخوار کنندگان",
  "قانقاریا",
];

export default (props) => {
  const [date, setDate] = useState(momentJalaali());
  const [selectedVaccine, setSelectedVaccine] = useState("");

  const [errors, setErrors] = useState({});

  const checkForVaccineErrors = () => {
    console.log("start checking for errors");
    return new Promise((resolve, reject) => {
      const newErrors = {};
      if (!selectedVaccine.length) {
        newErrors.vaccine = "انتخاب واکسن الزامی است";
      }

      if (!Object.keys(newErrors).length) resolve();
      else if (Object.keys(newErrors).length) reject(newErrors);
    });
  };

  const handleSubmit = () => {
    checkForVaccineErrors()
      .then(() => {
        setErrors({});

        const data = {
          entry: {
            date,
            createdAt: momentJalaali(),
            vaccine: selectedVaccine,
            key: props.animalKey,
          },
          token: localStorage.artimal,
        };

        ApiPost("api/v0/vaccine", data)
          .then((res) => {
            console.log(res);
            notification(res.result, "success");
            // TODO:clear vaccine input
            setSelectedVaccine([""]);
            props.forceUpdate();
          })
          .catch((err) => {
            console.log(err);
            notification(err.error, "danger");
          });
      })
      .catch((err) => {
        console.log(err);
        setErrors(err);
      });
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
          <Label>واکسن</Label>
          <Typeahead
            className="typeahead"
            id="vaccine-typeahead"
            labelKey="name"
            onChange={setSelectedVaccine}
            options={vaccineOptions}
            placeholder="واکسن را انتخاب کنید"
            selected={selectedVaccine}
          />
          {errors.vaccine ? (
            <p className="error-text-form">{errors.vaccine}</p>
          ) : null}
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
