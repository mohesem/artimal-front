import React from "react";
import momentJalaali from "moment-jalaali";
// reactstrap components
import { Card, CardHeader, CardBody, Table } from "reactstrap";

export default (props) => {
  const renderBody = () => {
    const result = props.vaccineObj.map((w, i) => {
      const createdAtJdate = momentJalaali(
        w.vaccine.createdAt,
        "YYYY-M-DTHH:mm:ss.SSSZ"
      ).format("jYYYY-jM-jD");
      return (
        <tr key={`weightItem${i}`}>
          <td>{createdAtJdate}</td>
          <td>{w.vaccine.value}</td>
          <td>{w.expense.value}</td>
        </tr>
      );
    });

    return result;
  };

  return (
    <Card>
      <CardHeader as="h5">جدول وزن</CardHeader>
      <CardBody>
        <Table>
          <thead className="text-primary">
            <tr>
              <th>تاریخ</th>
              <th>نوع</th>
              <th>هزینه</th>
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
