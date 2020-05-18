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
  const [type, setType] = useState("همه");
  const [entryType, setEntryType] = useState("");
  const [sex, setSex] = useState("");
  const [key, setKey] = useState("");
  const [options, setOptions] = useState([]);
  //   const [selectedAnimal, setSelectedAnimal] = useState({});

  /* -------------------------------------------------------------------------- */
  /*                                   effects                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (key === props.selectedAnimal._key) {
      setOptions([]);
    } else if (key) {
      let q = "limit:10";
      if (key) q += `&&key:${key}`;
      if (sex || sex === 0) q += `&&sex:${sex}`;
      if (type !== "همه") q += `&&type:${type}`;
      if (entryType) q += `&&entryType:${entryType}`;

      console.log({ q });

      ApiGet(`api/v0/animal/stock/${q}`)
        .then((res) => {
          console.log(res);
          if (!res.result.length) {
            // TODO: find another way to inform user that no result had beeb found on search
            // notification("دامی پیدا نشد", "warning");
            setOptions([]);
          } else {
            setOptions(res.result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [entryType, key, props, sex, type]);

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
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
        <FormGroup>
          <Label>نوع</Label>
          <FormGroup>
            <Input
              className="select-input"
              type="select"
              onChange={(e) => {
                setType(e.target.value);
                // setRace("");
              }}
              // isValid={type}
              // isInvalid={Object.keys(errors.type).length || !type}
            >
              <option>همه</option>
              <option>گوسفند</option>
              <option>بز</option>
              <option>اسب</option>
              <option>گاو</option>
              <option>سگ</option>
            </Input>
          </FormGroup>
        </FormGroup>

        <FormGroup>
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
        </FormGroup>

        <FormGroup>
          <Input
            placeholder="پلاک دام را وارد کنید"
            value={key}
            onChange={(e) => setKey(e.target.value)}
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
