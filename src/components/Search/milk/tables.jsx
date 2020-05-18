import React, { useState, useEffect } from "react";
import momentJalaali from "moment-jalaali";
// reactstrap components
import { Card, CardHeader, CardBody, Table, Button } from "reactstrap";
// component
import EditModal from "./editModal";

export default (props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  /* -------------------------------------------------------------------------- */
  /*                                  handlders                                 */
  /* -------------------------------------------------------------------------- */
  const handleSelectItem = (key) => {
    const item = props.milkRecords.filter((i) => i._key === key);
    console.log("|||||||||||", item);
    setSelectedItem(item[0]);
  };

  console.log("++++++", props);
  const renderBody = () => {
    const result = props.milkRecords.map((m, i) => {
      const createdAtJdate = momentJalaali(
        m.date,
        "YYYY-M-DTHH:mm:ss.SSSZ"
      ).format("jYYYY-jM-jD");
      return (
        <tr key={`weightItem${i}`}>
          <td>{createdAtJdate}</td>
          <td>{m.value}</td>
          <td>
            <Button
              type="button"
              color="link"
              onClick={() => {
                console.log("clickeeeeeeeeeeeeeeeeeeeeeeeed", m);
                handleSelectItem(m._key);
                handleEditModalOpen();
              }}
            >
              ویرایش
            </Button>
          </td>
        </tr>
      );
    });

    return result;
  };

  const handleEditModalOpen = () => {
    setEditModalOpen(!editModalOpen);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   return                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <Card>
        <CardHeader as="h5">جدول شیردهی</CardHeader>
        <CardBody>
          {props.milkRecords.length ? (
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>تاریخ</th>
                  <th>وزن</th>
                </tr>
              </thead>
              <tbody>{renderBody()}</tbody>
            </Table>
          ) : (
            <p>رکوردی ثبت نشده است</p>
          )}
        </CardBody>
      </Card>
      <EditModal
        isOpen={editModalOpen}
        handleClose={handleEditModalOpen}
        forceUpdate={props.forceUpdate}
        selectedItem={selectedItem}
      />
    </>
  );
};
