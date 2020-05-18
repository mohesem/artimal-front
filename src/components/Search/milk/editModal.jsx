import React, { useState, useEffect } from "react";
import momentJalaali from "moment-jalaali";
import DatePicker from "react-datepicker2";
import notification from "helpers/notification";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from "reactstrap";

// api

import ApiDelete from "API/delete";
import ApiPut from "API/put";

export default (props) => {
  console.log("--___-___-_----_", props);
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [date, setDate] = useState();
  const [value, setValue] = useState("");
  const [valueError, setValueError] = useState("");
  const [dateError, setDateError] = useState("");
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
      `api/v0/milk/${localStorage.artimal}/${props.selectedItem._key}/${props.animalKey}`
    )
      .then((res) => {
        props.forceUpdate();
        props.handleClose();
        notification(res.result, "success");
      })
      .catch((err) => {
        if (err.error) {
          notification(err.error);
        } else {
          notification("خطا در برقراری ارتباط", "danger");
        }
      });
  };

  const handleSubmit = () => {
    setValueError("");
    setDateError("");
    if (!value) {
      setValueError("ورود وزن شیر الزامی است");
    }
    if (!date) {
      setDateError("ورود تاریخ الزامی است");
    }

    if (!dateError && !valueError) {
      const data = {
        entry: {
          value,
          date,
          key: props.selectedItem._key,
          animalKey: props.animalKey,
        },
        token: localStorage.artimal,
      };

      ApiPut("api/v0/milk", data)
        .then((res) => {
          props.forceUpdate();
          props.handleClose();
          notification(res.result, "success");
        })
        .catch((err) => {
          if (err.error) {
            notification(err.error);
          } else {
            notification("خطا در برقراری ارتباط", "danger");
          }
        });
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                   effect                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (props.selectedItem) {
      setDate(momentJalaali(props.selectedItem.date));
      setValue(props.selectedItem.value);
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
          <p className="error-text-form">{dateError}</p>

          <Label>وزن</Label>
          <Input
            placeholder="به کیلوگرم"
            value={value}
            onChange={(e) => {
              console.log(e);
              setValue(e.target.value);
            }}
            type="number"
          />
          <p className="error-text-form">{valueError}</p>

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
