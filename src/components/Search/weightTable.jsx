import React from "react";
import momentJalaali from "moment-jalaali";
// reactstrap components
import { Card, CardHeader, CardBody, Table } from "reactstrap";

export default (props) => {
  const renderBody = () => {
    const result = props.weightObj.map((w, i) => {
      const createdAtJdate = momentJalaali(
        w.createdAt,
        "YYYY-M-DTHH:mm:ss.SSSZ"
      ).format("jYYYY-jM-jD");
      return (
        <tr key={`weightItem${i}`}>
          <td>{createdAtJdate}</td>
          <td>{w.weight}</td>
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
              <th>وزن</th>
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
