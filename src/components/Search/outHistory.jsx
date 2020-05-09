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

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */

  const handleSelectItem = (key) => {
    const item = props.pregnancyRecords.filter((i) => i.pregnancy._key === key);
    console.log("|||||||||||", item);
    setSelectedItem(item[0]);
  };

  const renderBody = () => {
    const createdAtJdate = momentJalaali(
      props.exit.date,
      "YYYY-M-DTHH:mm:ss.SSSZ"
    ).format("jYYYY-jM-jD");

    return (
      <tr>
        <td>{createdAtJdate}</td>
        {props.exit.type === "sell" ? <td>فروش</td> : null}
        {props.exit.type === "slaughter" ? <td>ذبح</td> : null}
        {props.exit.type === "death" ? <td>{props.exit.reason}</td> : null}

        {/* <td>{w.male._key}</td> */}
        {/* <td>
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
          </td> */}
      </tr>
    );

    // return null;
  };

  return (
    <>
      <Card>
        <CardHeader as="h5">تاریخچه بارداری</CardHeader>
        <CardBody>
          {props.exit ? (
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>تاریخ</th>
                  <th>نحوه ی خروج</th>
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
