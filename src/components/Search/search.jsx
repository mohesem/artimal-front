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
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";

// api
import ApiGet from "API/get";

export default (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [entryType, setEntryType] = useState(undefined);
  const [sex, setSex] = useState(undefined);
  const [key, setKey] = useState("");
  const [options, setOptions] = useState([]);
  //   const [selectedAnimal, setSelectedAnimal] = useState({});

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleKey = (value) => {
    setKey(value);
    if (!value) {
      setOptions([]);
    } else if (value.length === 6) {
      ApiGet(`api/v0/animal/stock/10/${value}`)
        .then((res) => {
          console.log("__--__--__--__", res.result[0], { res });
          setOptions([]);
          setKey(res.result[0].key);
          props.updateKey(res.result[0].key);
        })
        .catch((err) => {
          console.log("__--__--__--__", { err });
        });
    } else {
      ApiGet(`api/v0/animal/stock/10/${value}`)
        .then((res) => {
          console.log(res);
          if (!res.result.length) {
            notification("دامی پیدا نشد", "warning");
            if (options.length) setOptions([]);
          } else {
            setOptions(res.result);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // searchKeyFromStartApi({ key: value, entryType, sex })
      //   .then((res) => {
      //     setOptions(res.results);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  };

  const handleNewEntry = (_key) => {
    setOptions([]);
    setKey(_key);
    props.updateKey(_key);
    // getAnimalDetailsApi(_key)
    //   .then((res) => {
    //     console.log("...............", res);
    //     // setSelectedAnimal({
    //     //   key: res.details._key,
    //     //   type: res.details.type,
    //     //   race: res.details.race,
    //     //   ebtryType: res.details.entryType,
    //     // });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  /* -------------------------------------------------------------------------- */
  /*                                   return                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <Card className="demo-icons">
      <CardHeader>
        <CardTitle tag="h6">جست و جو</CardTitle>
      </CardHeader>
      <CardBody>
        {/* <FormGroup>
          <Label>نحوه ی ورود</Label>
          <div style={{ display: "flex" }}>
            <FormGroup check>
              <Label check>
                <span>تولد</span>
                <Input
                  type="radio"
                  onChange={() => setEntryType(0)}
                  checked={entryType === 0}
                />
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <span>خرید</span>
                <Input
                  type="radio"
                  onChange={() => setEntryType(1)}
                  checked={entryType === 1}
                />
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <span>موجودی سابق</span>
                <Input
                  type="radio"
                  onChange={() => setEntryType(2)}
                  checked={entryType === 2}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Button
                className="icon-button-round icon-button-danger"
                type="button"
                color="danger"
                size="small"
                onClick={() => setEntryType(undefined)}
              >
                <i className="nc-icon nc-simple-remove text-light" />
              </Button>
            </FormGroup>
          </div>
        </FormGroup>
        <FormGroup>
          <Label>جنسیت</Label>
          <div style={{ display: "flex" }}>
            <FormGroup check>
              <Label check>
                <span>نر</span>
                <Input
                  type="radio"
                  onChange={() => setSex(0)}
                  checked={sex === 0}
                />
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <span>ماده</span>
                <Input
                  type="radio"
                  onChange={() => setSex(1)}
                  checked={sex === 1}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Button
                className="icon-button-round icon-button-danger"
                type="button"
                color="danger"
                size="small"
                onClick={() => setSex(undefined)}
              >
                <i className="nc-icon nc-simple-remove text-light" />
              </Button>
            </FormGroup>
          </div>
        </FormGroup> */}

        <FormGroup>
          <Input
            placeholder="پلاک دام را وارد کنید"
            value={key}
            onChange={(e) => handleKey(e.target.value)}
            type="text"
          />
          {options.length ? (
            <ListGroup className="input-options" style={{ top: 45 }}>
              {options.map((o, i) => {
                return (
                  <ListGroupItem
                    key={`listItem${i}`}
                    action
                    onClick={() => handleNewEntry(o.key)}
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
          ) : undefined}
        </FormGroup>
      </CardBody>
    </Card>
  );
};
