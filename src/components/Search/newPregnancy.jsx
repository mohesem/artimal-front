import React, { useState } from "react";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import notification from "helpers/notification";
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
  ListGroup,
  ListGroupItem,
  Col,
  Row,
} from "reactstrap";

// api
// import putPregnancyApi from "API/pregnancy/put";
import ApiPost from "API/post";
import ApiGet from "API/get";

export default (props) => {
  const [date, setDate] = useState(momentJalaali());
  const [maleKey, setMaleKey] = useState("");
  const [maleKeyError, setMaleKeyError] = useState("");
  const [maleOptions, setMaleOptions] = useState([]);
  //   const [error, setError] = useState("");

  const checkForErrors = () => {
    console.log("start checking for errors");
    return new Promise((resolve, reject) => {
      if (!maleKey) {
        reject("ورود کد دام نر برای بارداری الزامی است");
      } else {
        resolve();
      }
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleFatherKeySelect = (_key) => {
    setMaleOptions([]);
    setMaleKey(_key);
    console.log(_key);
  };

  const handleFatherKeyChange = (value) => {
    setMaleKey(value);

    // console.log(
    //   "=============",
    //   `api/v0/animal/stock/10/${value}/0/${props.selectedAnimal.type}/${props.selectedAnimal.race}`
    // );

    const q = `limit:10&&key:${value}&&type:${props.selectedAnimal.type}&&race:${props.selectedAnimal.race}`;
    ApiGet(`api/v0/animal/stock/${q}`)
      .then((res) => {
        if (!res.result.length) notification("نتیجه ای پیدا نشد", "warning");
        setMaleOptions(res.result);
        if (value.length === 6 && res.results[0].key === value) {
          setMaleOptions([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                                   submit                                   */
  /* -------------------------------------------------------------------------- */
  const handleSubmit = () => {
    checkForErrors()
      .then(() => {
        const data = {
          entry: {
            createdAt: momentJalaali(),
            date,
            maleKey,
            femaleKey: props.selectedAnimal._key,
          },
          token: localStorage.artimal,
        };

        ApiPost("api/v0/pregnancy/new", data)
          .then((res) => {
            console.log(res);
            notification(res.result, "success");
            props.forceUpdate();
          })
          .catch((err) => {
            console.log(err);
            notification(err.error, "danger");
          });
      })
      .catch((err) => {
        setMaleKeyError(err);
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                                 conditions                                 */
  /* -------------------------------------------------------------------------- */
  if (!maleKey && maleOptions.length) {
    setMaleOptions([]);
  }

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
          <Label>پلاک پدر</Label>
          <Input
            placeholder="پلاک پدر"
            value={maleKey}
            onChange={(e) => {
              handleFatherKeyChange(e.target.value);
            }}
            type="text"
          />
          {maleOptions.length ? (
            <ListGroup className="input-options">
              {maleOptions.map((o, i) => {
                return (
                  <ListGroupItem
                    key={`listItem${i}`}
                    action
                    onClick={() => handleFatherKeySelect(o.key)}
                    // variant={i % 2 === 0 ? "info" : "primary"}
                    type="button"
                  >
                    <Row>
                      <Col>{o.key}</Col>
                      <Col>{o.type}</Col>
                      <Col>{o.race}</Col>
                    </Row>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          ) : null}
          {maleKeyError ? (
            <p className="error-text-form">{maleKeyError}</p>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Button type="button" color="primary" onClick={handleSubmit}>
            تایید
          </Button>
          {/* {error ? <p className="error-text-form">{error}</p> : null} */}
        </FormGroup>
      </CardBody>
    </Card>
  );
};
