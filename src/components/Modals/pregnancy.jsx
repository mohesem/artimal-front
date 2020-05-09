import React, { useState, useEffect, useCallback } from "react";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import notification from "../../helpers/notification";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
} from "reactstrap";

// api
import readPregnancyDetailsApi from "../../API/pregnancy/readDetails";
import removePregnancyApi from "../../API/pregnancy/remove";

export default (props) => {
  const [pregnancyDetails, setPregnancyDetails] = useState();
  const [femaleKey, setFemaleKey] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleBody = () => {
    if (pregnancyDetails) {
      const female = pregnancyDetails.filter((e) => e.parent.sex === 1);
      console.log("------------", female);
      if (femaleKey !== female[0].parent._key)
        setFemaleKey(female[0].parent._key);

      const male = pregnancyDetails.filter((e) => e.parent.sex === 0);
      console.log("male", male, "female", female);

      const createdAtJdate = momentJalaali(
        props.selectedItem.pregnancy.startedAt,
        "YYYY-M-DTHH:mm:ss.SSSZ"
      ).format("jYYYY-jM-jD");

      const finishedAt = () => {
        if (props.selectedItem.pregnancy.finishedAt) {
          momentJalaali(
            props.selectedItem.pregnancy.finishedAt,
            "YYYY-M-DTHH:mm:ss.SSSZ"
          ).format("jYYYY-jM-jD");
        } else {
          return "در جریان";
        }
      };

      const FemaleCard = (
        <Card className="demo-icons">
          <CardHeader>
            <CardTitle tag="h6">ماده</CardTitle>
          </CardHeader>
          <CardBody>
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>پلاک</th>
                  <th>نوع</th>
                  <th>نژاد</th>
                </tr>
              </thead>
              <tbody>
                {" "}
                <tr>
                  <td>{female[0].parent._key}</td>
                  <td>{female[0].parent.type}</td>
                  <td>{female[0].parent.race}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      );

      const MaleCard = (
        <Card className="demo-icons">
          <CardHeader>
            <CardTitle tag="h6">نر</CardTitle>
          </CardHeader>
          <CardBody>
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>پلاک</th>
                  <th>نوع</th>
                  <th>نژاد</th>
                </tr>
              </thead>
              <tbody>
                {" "}
                <tr>
                  <td>{male[0].parent._key}</td>
                  <td>{male[0].parent.type}</td>
                  <td>{male[0].parent.race}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      );

      const DetailCard = (
        <Card>
          <CardHeader as="h5">جدول وزن</CardHeader>
          <CardBody>
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>شروع</th>
                  <th>پایان</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{createdAtJdate}</td>
                  <td>{finishedAt()}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      );

      return (
        <>
          {DetailCard}
          {FemaleCard}
          {MaleCard}
        </>
      );
    } else {
      return null;
    }

    // return body;
  };

  const handleRemoveRecord = () => {
    console.log("deleeeeeeeeeeeeeeeeeeeeeete", femaleKey);
    const data = {
      entry: {
        key: props.selectedItem.pregnancy._key,
        femaleKey: femaleKey,
      },
      token: localStorage.artimal,
    };

    removePregnancyApi(data)
      .then((res) => {
        console.log("------------", res);
        notification(res.result, "success");
        props.forceUpdate();
        props.handleClose();
      })
      .catch((err) => {
        console.log(err);
        notification(err.error, "danger");
      });
  };
  /* -------------------------------------------------------------------------- */
  /*                                   effect                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    console.log(props);
    if (props.selectedItem && Object.keys(props.selectedItem)) {
      console.log("sendig requeeeeeeeeeeeeeest");
      const data = {
        entry: {
          key: props.selectedItem.pregnancy._key,
        },
        token: localStorage.artiman,
      };

      readPregnancyDetailsApi(data)
        .then((res) => {
          console.log("------------", res);
          setPregnancyDetails(res.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props]);
  /* -------------------------------------------------------------------------- */
  /*                                   return                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        toggle={props.handleClose}
        // className={className}
      >
        <ModalHeader
        // toggle={toggle}
        >
          ویرایش
        </ModalHeader>
        <ModalBody>
          {handleBody()}

          <Button color="danger" onClick={handleRemoveRecord}>
            پاک کردن
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="button">
            تایید
          </Button>
          <Button color="secondary" onClick={props.handleClose}>
            انصراف
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
