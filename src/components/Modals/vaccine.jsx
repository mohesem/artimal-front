import React, { useState, useEffect, useCallback } from "react";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import notification from "../../helpers/notification";
import { Typeahead } from "react-bootstrap-typeahead";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Label,
  Input,
} from "reactstrap";

// api
import ApiDelete from "API/delete";
// import updateVaccineApi from "../../API/vaccine/update";
import ApiPut from "API/put";

// default values
const vaccineOptions = [
  "آنتروتوکسمی",
  "تب برفکی",
  "بروسلوز",
  "آگالاکسی",
  "شاربن",
  "آبله",
  "طاعون نشخوار کنندگان",
  "قانقاریا",
];

export default (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [date, setDate] = useState();
  const [vaccine, setVaccine] = useState("");
  const [vaccineError, setVaccineError] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleRemoveRecord = () => {
    ApiDelete(
      `api/v0/vaccine/${localStorage.artimal}/${props.selectedItem._key}`
    )
      .then((res) => {
        props.forceUpdate();
        props.handleClose();
        notification(res.result, "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    const data = {
      entry: {
        value: vaccine,
        date,
        key: props.selectedItem._key,
      },
      token: localStorage.artimal,
    };

    console.log(data);

    ApiPut(`api/v0/vaccine`, data)
      .then((res) => {
        props.forceUpdate();
        props.handleClose();
        notification(res.result, "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /* -------------------------------------------------------------------------- */
  /*                                   effect                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (props.selectedItem) {
      setDate(momentJalaali(props.selectedItem.date));
      setVaccine(props.selectedItem.value);
    }
  }, [props]);

  console.log(".....................XXXXXX", props);
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
          <DatePicker
            isGregorian={false}
            timePicker={false}
            value={date}
            onChange={(value) => setDate(value)}
          />
          <Label>واکسن</Label>
          <Typeahead
            className="typeahead"
            id="vaccine-typeahead"
            labelKey="name"
            onChange={setVaccine}
            options={vaccineOptions}
            placeholder="واکسن را انتخاب کنید"
            selected={vaccine}
          />
          <p className="error-text-form">{vaccineError}</p>
          <Button color="danger" onClick={handleRemoveRecord}>
            پاک کردن
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="button" onClick={handleSubmit}>
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
