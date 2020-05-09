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
import ApiPut from "API/put";

export default (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [date, setDate] = useState();
  const [weight, setWeight] = useState("");
  const [weightError, setWeightError] = useState("");
  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleRemoveRecord = () => {
    const data = {
      entry: {
        key: props.selectedItem._key,
      },
      token: localStorage.artimal,
    };
    console.log("remove buttomn clicked :: key is ", data);

    ApiDelete(
      `api/v0/weight/${localStorage.artimal}/${props.selectedItem._key}`
    )
      .then((res) => {
        props.forceUpdate();
        props.handleClose();
        notification(res.result, "success");
      })
      .catch((err) => {
        console.log(err);
      });

    // removeWeightApi(data)
    //   .then((res) => {
    //     props.forceUpdate();
    //     props.handleClose();
    //     notification(res.result, "success");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleSubmit = () => {
    console.log(date, weight);

    const data = {
      entry: {
        value: weight,
        date,
        key: props.selectedItem._key,
      },
      token: localStorage.artimal,
    };

    ApiPut("api/v0/weight", data)
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
      setWeight(props.selectedItem.value);
      console.log("sendig requeeeeeeeeeeeeeest");
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
          <DatePicker
            isGregorian={false}
            timePicker={false}
            value={date}
            onChange={(value) => setDate(value)}
          />
          <Label>وزن</Label>
          <Input
            placeholder="به کیلوگرم"
            value={weight}
            onChange={(e) => {
              console.log(e);
              setWeight(e.target.value);
            }}
            type="number"
          />
          <p className="error-text-form">{weightError}</p>
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
