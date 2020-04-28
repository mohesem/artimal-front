import React, { useState } from "react";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import notification from "helpers/notification";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  FormGroup,
  Button,
  Label,
  Input,
  CardTitle,
} from "reactstrap";

// api
import putDeathApi from "API/putDeath";
import putAnimalSellApi from "API/putAnimalSell";
import putSlaughterApi from "API/putSlaughter";

export default (props) => {
  const [mode, setMode] = useState(0);

  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  // sell states
  const [sellDate, setSellDate] = useState(momentJalaali());
  const [sellPrice, setSellPrice] = useState("");
  const [sellComment, setSellComment] = useState("");
  const [sellPriceError, setSellPriceError] = useState("");

  // slaughter states
  const [slaughterDate, setSlaughterDate] = useState(momentJalaali());
  const [weight, setWeight] = useState("");
  const [weightError, setWeightError] = useState("");

  // deatch states
  const [deathComment, setDeathComment] = useState("");
  const [deathReasonError, setDeathReasonError] = useState("");
  const [deathDate, setDeathDate] = useState(momentJalaali());
  const [deathReason, setDeathReason] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleDeathSubmit = () => {
    if (!deathReason) setDeathReasonError("دلیل مرگ را مشخص کنید");
    else {
      const data = {
        entry: {
          comment: deathComment,
          reason: deathReason,
          date: deathDate,
          key: props.animalKey,
        },
        token: localStorage.artimal,
      };

      putDeathApi(data)
        .then((res) => {
          if (deathReasonError) setDeathReasonError("");
          console.log(res);
          notification(res.result, "success");
          props.forceUpdate();
        })
        .catch((err) => {
          console.log("errrrrrrrrrrr", err);
          notification(err.error, "danger");
        });
    }
  };

  const handleSlaughterSubmit = () => {
    if (!weight) {
      setWeightError("ورود وزن الزامی است");
    } else {
      const data = {
        entry: {
          weight: weight,
          date: deathDate,
          key: props.animalKey,
        },
        token: localStorage.artimal,
      };

      putSlaughterApi(data)
        .then((res) => {
          if (sellPriceError) setSellPriceError("");
          console.log(res);
          notification(res.result, "success");
          props.forceUpdate();
        })
        .catch((err) => {
          console.log("errrrrrrrrrrr", err);
          notification(err.error, "danger");
        });
    }
  };

  const handleSellSubmit = () => {
    if (!sellPrice) {
      setSellPriceError("مبلغ فروش رو وارد کنید");
    } else {
      const data = {
        entry: {
          date: sellDate,
          price: sellPrice,
          comment: sellComment,
          key: props.animalKey,
        },
        token: localStorage.artimal,
      };

      putAnimalSellApi(data)
        .then((res) => {
          if (sellPriceError) setSellPriceError("");
          console.log(res);
          notification(res.result, "success");
          props.forceUpdate();
        })
        .catch((err) => {
          console.log("errrrrrrrrrrr", err);
          notification(err.error, "danger");
        });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   return                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h6">خروج</CardTitle>
      </CardHeader>

      <CardBody>
        <ButtonGroup>
          <Button
            color={mode === 0 ? "primary" : "link"}
            type="button"
            onClick={() => setMode(0)}
          >
            فروش
          </Button>
          <Button
            color={mode === 1 ? "primary" : "link"}
            type="button"
            onClick={() => setMode(1)}
          >
            ذبح
          </Button>
          <Button
            color={mode === 2 ? "primary" : "link"}
            type="button"
            onClick={() => setMode(2)}
          >
            مرگ
          </Button>
        </ButtonGroup>
        <hr />

        {mode === 0 ? (
          <>
            <FormGroup>
              <DatePicker
                isGregorian={false}
                timePicker={false}
                value={sellDate}
                onChange={(value) => setSellDate(value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>مبلغ</Label>
              <FormGroup>
                <Input
                  placeholder="به تومان"
                  value={sellPrice}
                  onChange={(e) => {
                    setSellPrice(e.target.value);
                  }}
                  type="number"
                />
              </FormGroup>
              {sellPriceError ? (
                <p className="error-text-form">{sellPriceError}</p>
              ) : null}
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">توضیحات</Label>
              <Input
                type="textarea"
                value={sellComment}
                onChange={(e) => setSellComment(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Button type="button" color="primary" onClick={handleSellSubmit}>
                تایید
              </Button>
            </FormGroup>
          </>
        ) : null}

        {mode === 1 ? (
          <>
            <FormGroup>
              <FormGroup>
                <DatePicker
                  isGregorian={false}
                  timePicker={false}
                  value={slaughterDate}
                  onChange={(value) => setSlaughterDate(value)}
                />
              </FormGroup>
            </FormGroup>
            <FormGroup>
              <Label>وزن</Label>
              <FormGroup>
                <Input
                  placeholder="کیلوگرم"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                  type="number"
                />
              </FormGroup>
              {weightError ? (
                <p className="error-text-form">{weightError}</p>
              ) : null}
            </FormGroup>
            <FormGroup>
              <Button
                type="button"
                color="primary"
                onClick={handleSlaughterSubmit}
              >
                تایید
              </Button>
            </FormGroup>
          </>
        ) : null}

        {mode === 2 ? (
          <>
            <FormGroup>
              <DatePicker
                isGregorian={false}
                timePicker={false}
                value={deathDate}
                onChange={(value) => setDeathDate(value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>دلیل مرگ</Label>
              <FormGroup>
                <Input
                  className="select-input"
                  type="select"
                  onChange={(e) => {
                    setDeathReason(e.target.value);
                  }}
                  // isValid={deathReason}
                >
                  {!deathReason ? <option>دلیل مرگ</option> : null}
                  <option>بیماری</option>
                  <option>حادثه</option>
                </Input>
              </FormGroup>
              {deathReasonError ? (
                <p className="error-text-form">{deathReasonError}</p>
              ) : null}
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">توضیحات</Label>
              <Input
                type="textarea"
                value={deathComment}
                onChange={(e) => setDeathComment(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Button type="button" color="primary" onClick={handleDeathSubmit}>
                تایید
              </Button>
            </FormGroup>
          </>
        ) : null}
      </CardBody>
    </Card>
  );
};
