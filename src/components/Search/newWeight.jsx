import React, { useState, useEffect } from "react";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import notifications from "../../helpers/notification";

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
import ApiPost from "API/post";

export default (props) => {
  const [date, setDate] = useState(momentJalaali());
  const [weight, setWeight] = useState("");
  const [weightError, setWeightError] = useState("");
  const [stopFeedingMilk, setStopFeedingMilk] = useState();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const findStopFeedingMilk = props.weightArr.filter(
      (record) => record.stopFeedingMilk
    );
    console.log(":::::", findStopFeedingMilk);

    if (findStopFeedingMilk.length)
      setStopFeedingMilk(findStopFeedingMilk[0].stopFeedingMilk);
  }, [props.weightArr]);

  const handleSubmit = () => {
    if (weight) {
      const data = {
        entry: {
          date,
          createdAt: momentJalaali(),
          value: weight,
          key: props.animalKey,
          stopFeedingMilk: check,
        },
        token: localStorage.artimal,
      };

      console.log(data);

      ApiPost(`api/v0/weight/new`, data)
        .then((res) => {
          console.log(res);
          notifications(res.result, "success");
          setWeight(0);
          setCheck(false);
          // TODO: froce update
          props.forceUpdate();
        })
        .catch((err) => {
          console.log(err);
          notifications(err.error, "danger");
        });
      // putWeightApi(data)
    } else {
      setWeightError("وزن را وارد کنید");
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
          <Label>وزن</Label>
          <FormGroup>
            <Input
              placeholder="به کیلوگرم"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              type="number"
            />
            <p className="error-text-form">{weightError}</p>
          </FormGroup>
        </FormGroup>
        {!stopFeedingMilk ? (
          <div>
            <Label
              check
              style={{
                position: "unset",
                verticalAlign: "middle",
              }}
            >
              <Input
                check
                style={{ marginRight: "10" }}
                type="checkbox"
                checked={check}
                onChange={() => setCheck(!check)}
              />
              <span style={{ marginRight: 22 }}>گرفتن از شیر</span>
            </Label>
          </div>
        ) : null}
        <FormGroup>
          <Button type="button" color="primary" onClick={handleSubmit}>
            تایید
          </Button>
        </FormGroup>
      </CardBody>
    </Card>
  );
};
