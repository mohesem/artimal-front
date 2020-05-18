import React, { useState } from "react";
import momentJalaali from "moment-jalaali";

// reactstrap components
import { Card, CardHeader, CardBody, Table, Button } from "reactstrap";

// component
import VaccineEditModal from "../Modals/vaccine";

export default (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [selectedItem, setSelectedItem] = useState();
  const [editModalOpen, setEditModalOpen] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */

  const handleSelectItem = (key) => {
    const item = props.vaccineArr.filter((i) => i._key === key);
    console.log("|||||||||||", item);
    setSelectedItem(item[0]);
  };

  const handleEditModalOpen = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleBody = () => {
    const result = props.vaccineArr.map((v, i) => {
      const createdAtJdate = momentJalaali(
        v.date,
        "YYYY-M-DTHH:mm:ss.SSSZ"
      ).format("jYYYY-jM-jD");
      return (
        <tr key={v._key}>
          <td>{createdAtJdate}</td>
          <td>{v.value}</td>
          <td>
            <Button
              type="button"
              color="link"
              onClick={() => {
                handleSelectItem(v._key);
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

  console.log("..............pppppp.", props);
  return (
    <>
      <Card>
        <CardHeader as="h5">واکسن ها</CardHeader>
        <CardBody>
          {props.vaccineArr.length ? (
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>تاریخ</th>
                  <th>نوع</th>
                </tr>
              </thead>
              <tbody>{handleBody()}</tbody>
            </Table>
          ) : (
            <p>واکسنی برای این دام ثبت نشده است</p>
          )}
        </CardBody>
      </Card>
      <VaccineEditModal
        isOpen={editModalOpen}
        handleClose={handleEditModalOpen}
        forceUpdate={props.forceUpdate}
        selectedItem={selectedItem}
        animalKey={props.animalKey}
      />
    </>
  );
};
