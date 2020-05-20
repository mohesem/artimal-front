import React, { useState } from "react";

// reactstrap components
import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

export default () => {
  const [type, setType] = useState();

  return (
    <div className="content">
      <Row>
        <p>مخارج</p>

        {/* <Form>
          <FormGroup>
            <Label>نوع</Label>
            <FormGroup>
              <Input
                className="select-input"
                type="select"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                isValid={type}
                // isInvalid={Object.keys(errors.type).length || !type}
              >
                {!type ? <option>نوع دام را انتخاب کنید</option> : null}
                <option>خ</option>
                <option>بز</option>
                <option>اسب</option>
                <option>گاو</option>
                <option>سگ</option>
              </Input>
            </FormGroup>
          </FormGroup>
        </Form> */}
      </Row>
    </div>
  );
};
