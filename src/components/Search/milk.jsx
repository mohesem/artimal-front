import React, { useState } from "react";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import notification from "helpers/notification";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  CardTitle,
  CardFooter,
} from "reactstrap";

// api
import putMilkApi from "API/putMilk";

export default (props) => {
  const [date, setDate] = useState(momentJalaali());
  const [milkWeight, setMilkWeight] = useState("");
  const [milkWeightError, setMilkWeightError] = useState("");

  const handleSubmit = () => {
    console.log("clicked");
    if (!milkWeight) {
      setMilkWeightError("ورود وزن شیر  دوشیده شده الزامی است");
    } else {
      const data = {
        entry: {
          weight: milkWeight,
          date: date,
          key: props.animalKey,
        },
        token: localStorage.artimal,
      };

      putMilkApi(data)
        .then((res) => {
          if (milkWeightError) setMilkWeightError("");
          console.log(res);
          notification(res.result, "success");
          props.forceUpdate();
        })
        .catch((err) => {
          console.log("errrrrrrrrrrr", err);
          notification(err.error, "danger");
        });

      console.log(data);
    }
  };

  return (
    <Card className="demo-icons">
      <CardHeader>
        <CardTitle tag="h6">شیر</CardTitle>
      </CardHeader>
      <CardBody>
        <FormGroup>
          <DatePicker
            isGregorian={false}
            timePicker={false}
            value={date}
            onChange={(value) => setDate(value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>وزن</Label>
          <FormGroup>
            <Input
              placeholder="کیلوگرم"
              value={milkWeight}
              onChange={(e) => {
                setMilkWeight(e.target.value);
              }}
              type="number"
            />
          </FormGroup>
          {milkWeightError ? (
            <p className="error-text-form">{milkWeightError}</p>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Button type="button" color="primary" onClick={handleSubmit}>
            تایید
          </Button>
        </FormGroup>
      </CardBody>

      <CardFooter className="button-group"></CardFooter>
    </Card>
  );
};
