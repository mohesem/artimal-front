import React, { useEffect, useState } from "react";
import momentJalaali from "moment-jalaali";

// reactstrap components
import { Table, Row, Col, Button } from "reactstrap";

// API
import ApiGet from "API/get";

export default () => {
  const [logs, setLogs] = useState([]);
  const [page, setpage] = useState();
  const [uri, setUri] = useState("");

  if (typeof page !== "number") setpage(0);

  useEffect(() => {
    console.log("send request");
    ApiGet(uri)
      .then((res) => {
        console.log("..........", res);
        setLogs(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [uri]);

  useEffect(() => {
    setUri(`api/v0/logs/pagination/20/${page}`);
  }, [page]);

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleBody = () => {
    return logs.map((log) => {
      const createdAtJdate = momentJalaali(log.createdAt).format("jYYYY-jM-jD");
      return (
        <tr key={log._key}>
          <td>{createdAtJdate}</td>
          <td>{log.value}</td>
          <td>{log.type}</td>
          <td>{log.entryId}</td>
          <td>{log.userId}</td>
        </tr>
      );
    });
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Button
            type="button"
            onClick={() => setpage(page + 1)}
            color="primary"
          >
            بعدی
          </Button>
          {page >= 1 ? (
            <Button
              type="button"
              onClick={() => setpage(page - 1)}
              color="secondary"
            >
              قبلی
            </Button>
          ) : null}
        </Col>
        <Col md="12">
          {logs.length ? (
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>تاریخ</th>
                  <th>نوع</th>
                  <th>مجموعه</th>
                  <th>کد دیتای وارد شده</th>
                  <th>توسط</th>
                </tr>
              </thead>
              <tbody>{handleBody()}</tbody>
            </Table>
          ) : null}
          <p>{page}</p>
        </Col>
      </Row>
    </div>
  );
};
