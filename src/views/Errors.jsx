import React, { useEffect, useState } from "react";
import momentJalaali from "moment-jalaali";

// reactstrap components
import { Row, Col, Table } from "reactstrap";

// api
import ApiGet from "API/get";

//
import notification from "../helpers/notification";

export default () => {
  const [uri, setUri] = useState("");
  const [page, setpage] = useState(0);
  const [results, setResults] = useState([]);

  /* -------------------------------------------------------------------------- */
  /*                                   effects                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (uri) {
      ApiGet(uri)
        .then((res) => {
          console.log("error get by pagination response", res);
          setResults(res.result);
        })
        .catch((err) => {
          if (err.error) {
            notification(err.error, "danger");
          } else notification("خطا در برقراری ارتباط", "danger");
        });
    }
  }, [uri]);

  useEffect(() => {
    setUri(`api/v0/errors/pagination/20/${page}`);
  }, [page]);

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleBody = () => {
    return results.map((el) => {
      const createdAtJdate = momentJalaali(el.createdAt).format("jYYYY-jM-jD");
      return (
        <tr key={el._key}>
          <td>{createdAtJdate}</td>
          <td>{el.type}</td>
          <td>{el.entryId}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            {results.length ? (
              <Table>
                <thead className="text-primary">
                  <tr>
                    <th>تاریخ</th>
                    <th>نوع خطا</th>
                    <th>کد دام</th>
                  </tr>
                </thead>
                <tbody>{handleBody()}</tbody>
              </Table>
            ) : null}
          </Col>
        </Row>
      </div>
    </>
  );
};
