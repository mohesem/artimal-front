import React, { useState } from "react";
import momentJalaali from "moment-jalaali";

// reactstrap components
import { Card, CardHeader, CardBody, Table, Button } from "reactstrap";

// component
import EditModal from "../../Modals/disease";
import NewStatus from "../../Modals/newStatusDisease";
import DetailsModal from "../../Modals/diseaseDetails";

export default (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [selectedItem, setSelectedItem] = useState();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newStatusModalOpen, setNewStatusModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */

  const handleSelectItem = (key) => {
    // console.log("XXXXXXXXXXXXXXXXXXX", props.diseaseArr[0].d);
    const item = props.diseaseArr.filter((i) => i._key === key);
    console.log("|||||||||||", item);
    setSelectedItem(item[0]);
  };

  const handleEditModalOpen = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleNewStatusModalOpen = () => {
    setNewStatusModalOpen(!newStatusModalOpen);
  };

  const handleDetailsModalOpen = () => {
    setDetailsModalOpen(!detailsModalOpen);
  };

  const handleBody = () => {
    const result = props.diseaseArr.map((disease, i) => {
      const createdAtJdate = momentJalaali(
        disease.date,
        "YYYY-M-DTHH:mm:ss.SSSZ"
      ).format("jYYYY-jM-jD");
      return (
        <tr key={`weightItem${i}`}>
          <td>{createdAtJdate}</td>
          <td>{disease.value}</td>
          <td>{disease.active ? "فعال" : "غیرفعال"}</td>
          <td>
            <Button
              type="button"
              color="link"
              onClick={() => {
                handleSelectItem(disease._key);
                handleEditModalOpen();
              }}
            >
              ویرایش
            </Button>
          </td>
          <td>
            <Button
              type="button"
              color="link"
              onClick={() => {
                handleSelectItem(disease._key);
                handleNewStatusModalOpen();
              }}
              disabled={!disease.active}
            >
              وضعیت جدید
            </Button>
          </td>
          <td>
            <Button
              type="button"
              color="link"
              onClick={() => {
                handleSelectItem(disease._key);
                handleDetailsModalOpen();
              }}
            >
              جزئیات
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
        <CardHeader as="h5">بیماری ها</CardHeader>
        <CardBody>
          {props.diseaseArr.length ? (
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>تاریخ</th>
                  <th>بیماری</th>
                  <th>وضعیت</th>
                </tr>
              </thead>
              <tbody>{handleBody()}</tbody>
            </Table>
          ) : (
            <p>بیماری ای برای این دام ثبت نشده است</p>
          )}
        </CardBody>
      </Card>
      <EditModal
        isOpen={editModalOpen}
        handleClose={handleEditModalOpen}
        forceUpdate={props.forceUpdate}
        selectedItem={selectedItem}
        animalKey={props.animalKey}
      />
      <NewStatus
        isOpen={newStatusModalOpen}
        handleClose={handleNewStatusModalOpen}
        forceUpdate={props.forceUpdate}
        selectedItem={selectedItem}
        animalKey={props.animalKey}
      />
      <DetailsModal
        isOpen={detailsModalOpen}
        handleClose={handleDetailsModalOpen}
        forceUpdate={props.forceUpdate}
        selectedItem={selectedItem}
      />
    </>
  );
};
