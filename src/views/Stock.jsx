import React, { useState, useEffect } from "react";

// reactstrap components
import { Row, Col, Table } from "reactstrap";

// api
import ApiGet from "API/get";

// components
import notification from "../helpers/notification";

export default () => {
  const [stock, setStock] = useState([]);

  /* -------------------------------------------------------------------------- */
  /*                                   effects                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    ApiGet("api/v0/animal/count")
      .then((res) => {
        console.log("counting stock result :::: ", res);
        setStock(res.result);
      })
      .catch((err) => {
        if (err.error) {
          notification(err.error, "danger");
        } else notification("خطا در برقراری ارتباط", "danger");
      });
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleBody = () => {
    return stock.map((el, i) => {
      return (
        <tr key={el.countType + i}>
          <td>{el.type}</td>
          <td>{el.race}</td>
          <td>{el.countType}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>نوع</th>
                  <th>نژاد</th>
                  <th>تعداد</th>
                </tr>
              </thead>
              <tbody>{handleBody()}</tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </>
  );
};
