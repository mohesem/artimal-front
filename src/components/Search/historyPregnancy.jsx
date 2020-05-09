import React, { useState } from "react";
import momentJalaali from "moment-jalaali";
// reactstrap components
import { Card, CardHeader, CardBody, Table, Button } from "reactstrap";

// component
import PegnancyEditModal from "../Modals/pregnancy";

export default (props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  // const [itemKey, setItemKey] = useState("");
  const [selectedItem, setSelectedItem] = useState();

  const handleEditModalOpen = () => {
    // console.log("handle modal close");
    setEditModalOpen(!editModalOpen);
  };

  const handleSelectItem = (key) => {
    const item = props.pregnancyRecords.filter((i) => i.pregnancy._key === key);
    console.log("|||||||||||", item);
    setSelectedItem(item[0]);
  };

  const renderBody = () => {
    console.log("----", props.pregnancyRecords);

    const result = props.pregnancyRecords.map((w, i) => {
      console.log(i);
      const createdAtJdate = momentJalaali(
        w.pregnancy.startedAt,
        "YYYY-M-DTHH:mm:ss.SSSZ"
      ).format("jYYYY-jM-jD");

      const finishedAt = () => {
        if (w.pregnancy.finishedAt) {
          momentJalaali(
            w.pregnancy.finishedAt,
            "YYYY-M-DTHH:mm:ss.SSSZ"
          ).format("jYYYY-jM-jD");
        } else {
          return "در جریان";
        }
      };
      return (
        <tr key={`item${i}`}>
          <td>{createdAtJdate}</td>
          <td>{finishedAt()}</td>
          <td>{w.male._key}</td>
          <td>
            <Button
              type="button"
              color="link"
              onClick={() => {
                console.log("clickeeeeeeeeeeeeeeeeeeeeeeeed", w.pregnancy._key);
                handleSelectItem(w.pregnancy._key);
                handleEditModalOpen();
              }}
            >
              ویرایش
            </Button>
          </td>
        </tr>
      );
    });

    console.log(result);

    return result;

    // return null;
  };

  return (
    <>
      <Card>
        <CardHeader as="h5">تاریخچه بارداری</CardHeader>
        <CardBody>
          {props.pregnancyRecords.length ? (
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>شروع</th>
                  <th>پایان</th>
                  <th>نر</th>
                </tr>
              </thead>
              <tbody>{renderBody()}</tbody>
            </Table>
          ) : (
            <p>رکوردی ثبت نشده است</p>
          )}
        </CardBody>
      </Card>
      <PegnancyEditModal
        handleClose={handleEditModalOpen}
        isOpen={editModalOpen}
        forceUpdate={props.forceUpdate}
        selectedItem={selectedItem}
      />
    </>
  );
};
