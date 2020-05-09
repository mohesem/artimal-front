import React, { useState } from "react";
import momentJalaali from "moment-jalaali";
// reactstrap components
import { Card, CardHeader, CardBody, Table, Button } from "reactstrap";
// component
import WeightEditModal from "../../components/Modals/weight";

export default (props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  /* -------------------------------------------------------------------------- */
  /*                                  handlders                                 */
  /* -------------------------------------------------------------------------- */
  const handleSelectItem = (key) => {
    const item = props.weightArr.filter((i) => i._key === key);
    console.log("|||||||||||", item);
    setSelectedItem(item[0]);
  };

  console.log("++++++", props);
  const renderBody = () => {
    const result = props.weightArr.map((w, i) => {
      const createdAtJdate = momentJalaali(
        w.date,
        "YYYY-M-DTHH:mm:ss.SSSZ"
      ).format("jYYYY-jM-jD");
      return (
        <tr key={`weightItem${i}`}>
          <td>{createdAtJdate}</td>
          <td>{w.value}</td>
          <td>
            <Button
              type="button"
              color="link"
              onClick={() => {
                console.log("clickeeeeeeeeeeeeeeeeeeeeeeeed", w);
                handleSelectItem(w._key);
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
      <WeightEditModal
        isOpen={editModalOpen}
        handleClose={handleEditModalOpen}
        forceUpdate={props.forceUpdate}
        selectedItem={selectedItem}
      />
    </>
  );
};
