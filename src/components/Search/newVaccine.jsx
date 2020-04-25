import React, { useState } from "react";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import { store } from "react-notifications-component";
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
import putVaccineApi from "API/putVaccine";

const vaccineOptions = ["آگالاکسی", "آبله"];

export default (props) => {
  const [date, setDate] = useState(momentJalaali());
  const [selectedVaccine, setSelectedVaccine] = useState("");
  const [vaccinePrice, setVaccinePrice] = useState();

  const [errors, setErrors] = useState({});

  const checkForVaccineErrors = () => {
    console.log("start checking for errors");
    return new Promise((resolve, reject) => {
      const newErrors = {};
      if (!selectedVaccine.length) {
        newErrors.vaccine = "انتخاب واکسن الزامی است";
      }
      if (!vaccinePrice) {
        newErrors.price = "ورود قیمت واکسن الزامی است";
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
            vaccine: selectedVaccine,
            price: vaccinePrice,
            key: props.animalKey,
          },
          token: localStorage.artimal,
        };

        putVaccineApi(data)
          .then((res) => {
            console.log(res);
            store.addNotification({
              // title: "Wonderful!",
              message: (
                <>
                  <br />
                  <p>{res.result}</p>
                </>
              ),
              type: "success",
              insert: "bottom",
              container: "bottom-left",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
                showIcon: true,
              },
            });
            setSelectedVaccine("");
            // TODO: froce update
            props.forceUpdate();
          })
          .catch((err) => {
            console.log(err);
            store.addNotification({
              // title: "Wonderful!",
              message: (
                <>
                  <br />
                  <p>{err.error}</p>
                </>
              ),
              type: "danger",
              insert: "bottom",
              container: "bottom-left",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
                showIcon: true,
              },
            });
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
          <Label>بیماری</Label>
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
          <Label>قیمت</Label>
          <FormGroup>
            <Input
              placeholder="به تومان"
              value={vaccinePrice}
              onChange={(e) => {
                setVaccinePrice(e.target.value);
              }}
              type="number"
            />
          </FormGroup>
          {errors.price ? (
            <p className="error-text-form">{errors.price}</p>
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
