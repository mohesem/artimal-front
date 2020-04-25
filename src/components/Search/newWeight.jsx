import React, { useState } from "react";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import { store } from "react-notifications-component";

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
import putWeightApi from "../../API/putWeight";

export default (props) => {
  const [date, setDate] = useState(momentJalaali());
  const [weight, setWeight] = useState();

  const handleSubmit = () => {
    const data = {
      entry: {
        date,
        weight,
        key: props.animalKey,
      },
      token: localStorage.artimal,
    };

    putWeightApi(data)
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
        setWeight(null);
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
          <Label>وزن</Label>
          <FormGroup>
            <Input
              placeholder="به کیلوگرم"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              type="number"
            ></Input>
          </FormGroup>
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
