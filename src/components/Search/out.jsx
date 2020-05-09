import React, { useState, useEffect } from "react";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import notification from "helpers/notification";
import { Typeahead } from "react-bootstrap-typeahead";
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
  Alert,
  Table,
} from "reactstrap";

// api
// import putDeathApi from "API/putDeath";
// import putAnimalSellApi from "API/putAnimalSell";
// import putSlaughterApi from "API/putSlaughter";
// import getActiveDisease from "API/disease/getActives";

import ApiPost from "API/post";
import ApiGet from "API/get";

// default values
// const illnessOptions = [
//   "سل گاوی",
//   "آنتروتوکسمی",
//   "شاربن",
//   "بروسلوز",
//   "آبله ی گوسفندی",
//   "آگالاکسی",
//   "هاری",
//   "تب برفکی",
// ];

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
  const [deathCommentError, setDeathCommentError] = useState("");
  const [deathReasonError, setDeathReasonError] = useState("");
  const [deathDate, setDeathDate] = useState(momentJalaali());
  const [deathReason, setDeathReason] = useState("");

  const [noDiseaseFound, setNoDiseaseFound] = useState(false);
  const [diseaseArr, setDiseaseArr] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState({});
  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleDeathSubmit = () => {
    if (!deathReason) setDeathReasonError("دلیل مرگ را مشخص کنید");
    else if (deathReason === "حادثه" && !deathComment)
      setDeathCommentError("توضیحات مرتبط با حادثه منجر به مرگ الزامی است");
    else {
      const data = {
        entry: {
          comment: deathComment,
          reason: deathReason,
          createdAt: momentJalaali(),
          date: deathDate,
          key: props.animalKey,
          disease: deathReason === "بیماری" ? selectedDisease : undefined,
        },
        token: localStorage.artimal,
      };

      ApiPost("api/v0/exit/death", data)
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
          createdAt: momentJalaali(),
          key: props.animalKey,
        },
        token: localStorage.artimal,
      };

      ApiPost("api/v0/exit/slaughter", data)
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

      // putAnimalSellApi(data)
      ApiPost("api/v0/exit/sell", data)
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

  const handleSubmitDisease = (key) => {
    const item = diseaseArr.filter((obj) => obj._key === key);
    console.log("item is :::", item);

    setSelectedDisease(item[0]);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   effect                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setDeathComment("");
    setDeathCommentError("");
  }, [deathReason]);

  useEffect(() => {
    console.log(")))))))))))))", mode);
    if (mode === 2 && deathReason === "بیماری") {
      console.log("now its the time");

      ApiGet(`api/v0/disease/active/${props.animalKey}`)
        .then((res) => {
          // if (sellPriceError) setSellPriceError("");
          console.log(res);
          if (!res.result.length && noDiseaseFound === false)
            setNoDiseaseFound(true);
          if (res.result.length && noDiseaseFound === true)
            setNoDiseaseFound(false);

          setDiseaseArr(res.result);
          // notification(res.result, "success");
          // props.forceUpdate();
        })
        .catch((err) => {
          console.log("errrrrrrrrrrr", err);
          notification(err.error, "danger");
        });
    }
  }, [mode, deathReason, props.animalKey, noDiseaseFound]);

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
              <p className="error-text-form">{deathReasonError}</p>
              {/* </FormGroup>
            {deathReason === "بیماری" ? (
              <FormGroup>
                <Label>بیماری</Label>
                <Typeahead
                  className="typeahead"
                  id="vaccine-typeahead"
                  labelKey="name"
                  onChange={setIllness}
                  options={illnessOptions}
                  placeholder="واکسن را انتخاب کنید"
                  selected={illness}
                />
              </FormGroup>
            ) : null}
            <FormGroup> */}
              {Object.keys(selectedDisease).length ? (
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>تاریخ</th>
                      <th>بیماری</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {momentJalaali(
                          selectedDisease.date,
                          "YYYY-M-DTHH:mm:ss.SSSZ"
                        ).format("jYYYY-jM-jD")}
                      </td>
                      <td>{selectedDisease.value}</td>
                      <td>
                        <Button
                          type="button"
                          // onClick={() => handleSubmitDisease(obj.d._key)}
                        >
                          حذف
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              ) : null}
              {noDiseaseFound ? (
                <Alert color="danger">
                  سابقه ی بیماری فعالی برای این دام یافت نشد. لطفا بیناری را
                  وارد منید و سپس نسبت به ثبت مرگ در اثر بیمار ی اقدام نمیایید
                </Alert>
              ) : null}
              {diseaseArr.length && !Object.keys(selectedDisease).length ? (
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>تاریخ</th>
                      <th>بیماری</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diseaseArr.map((obj, i) => {
                      const createdAtJdate = momentJalaali(
                        obj.date,
                        "YYYY-M-DTHH:mm:ss.SSSZ"
                      ).format("jYYYY-jM-jD");
                      return (
                        <tr key={`disease${i}`}>
                          <td>{createdAtJdate}</td>
                          <td>{obj.value}</td>
                          <td>
                            <Button
                              type="button"
                              onClick={() => handleSubmitDisease(obj._key)}
                            >
                              تایید
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : null}

              <Label for="exampleText">توضیحات</Label>
              <Input
                type="textarea"
                value={deathComment}
                onChange={(e) => setDeathComment(e.target.value)}
                disabled={
                  mode === 2 && deathReason === "بیماری" && noDiseaseFound
                }
              />
              <p className="error-text-form">{deathCommentError}</p>
            </FormGroup>
            <FormGroup>
              <Button
                type="button"
                color="primary"
                onClick={handleDeathSubmit}
                disabled={
                  mode === 2 &&
                  deathReason === "بیماری" &&
                  !Object.keys(selectedDisease).length
                }
              >
                تایید
              </Button>
            </FormGroup>
          </>
        ) : null}
      </CardBody>
    </Card>
  );
};
