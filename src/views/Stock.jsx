import React, { useState, useEffect } from "react";

// reactstrap components
import { Row, Col, Table } from "reactstrap";

// api
import ApiGet from "API/get";

// components
import notification from "../helpers/notification";

export default () => {
  const [stock, setStock] = useState({});

  /* -------------------------------------------------------------------------- */
  /*                                   effects                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    ApiGet("api/v0/animal/count")
      .then((res) => {
        console.log("counting stock result :::: ", res);
        const mergeObject = {};
        res.result.forEach((el) => {
          if (!mergeObject[el.type + el.race]) {
            mergeObject[el.type + el.race] = {};
            mergeObject[el.type + el.race].type = el.type;
            mergeObject[el.type + el.race].race = el.race;
            mergeObject[el.type + el.race][el.sex] = el.countType;
          } else {
            mergeObject[el.type + el.race][el.sex] = el.countType;
          }
        });
        setStock(mergeObject);
      })
      .catch((err) => {
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", err);
        if (err.error) {
          notification(err.error, "danger");
        } else notification("خطا در برقراری ارتباط", "danger");
      });
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleBody = () => {
    console.log("+==+=+++=+", Object.entries(stock));
    return Object.entries(stock).map(([key, value], i) => {
      console.log("========================", value);
      // return null;
      return (
        <tr key={value.countType + i}>
          <td>{value.type}</td>
          <td>{value.race}</td>
          <td>{value["0"] ? value["0"] : 0}</td>
          <td>{value["1"] ? value["1"] : 0}</td>
        </tr>
      );
    });
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Table>
            <thead className="text-primary">
              <tr>
                <th>نوع</th>
                <th>نژاد</th>
                <th>تعداد نر</th>
                <th>نعداد ماده</th>
              </tr>
            </thead>
            <tbody>{handleBody()}</tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};
