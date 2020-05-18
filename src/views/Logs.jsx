import React, { useEffect, useState } from "react";
import momentJalaali from "moment-jalaali";

// reactstrap components
import { Table, Row, Col, Button, FormGroup, Label, Input } from "reactstrap";

// API
import ApiGet from "API/get";

export default () => {
  const [logs, setLogs] = useState([]);
  const [page, setpage] = useState();
  const [uri, setUri] = useState("");

  // const [key, setKey] = useState("");
  const [value, setValue] = useState("همه");
  const [collection, setCollection] = useState("همه");

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
    const _collection = () => {
      switch (collection) {
        case "همه":
          return null;
        case "وزن":
          return "weight";
        case "شیر":
          return "milk";
        case "بیماری":
          return "disease";
        case "درآمد":
          return "income";
        case "واکسن":
          return "vaccine";
        case "بارداری":
          return "pregnancy";
        case "مخارج":
          return "expense";
        default:
          break;
      }
    };
    // <option>ساخت</option>
    // <option>بروزرسانی</option>
    // <option>پاک کردن</option>

    const _value = () => {
      switch (value) {
        case "همه":
          return null;
        case "ساخت":
          return "create";
        case "بروزرسانی":
          return "update";
        case "پاک کردن":
          return "delete";
        default:
          break;
      }
    };

    console.log({ _collection: _collection() });
    setUri(`api/v0/logs/pagination/20/${page}/${_collection()}/${_value()}`);
  }, [page, collection, value]);

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
        <Col md="4">
          <FormGroup>
            <Label>کالکشن</Label>
            <FormGroup>
              <Input
                className="select-input"
                type="select"
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
              >
                <option>همه</option>
                <option>وزن</option>
                <option>شیر</option>
                <option>بیماری</option>
                <option>درآمد</option>
                <option>واکسن</option>
                <option>بارداری</option>
                <option>مخارج</option>
              </Input>
            </FormGroup>
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label>اقدام</Label>
            <FormGroup>
              <Input
                className="select-input"
                type="select"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                <option>همه</option>
                <option>ساخت</option>
                <option>بروزرسانی</option>
                <option>پاک کردن</option>
              </Input>
            </FormGroup>
          </FormGroup>
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
      </Row>
    </div>
  );
};
