import React, { useState, useEffect } from "react";
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
  Label,
  Input,
} from "reactstrap";

// api
// import removeDiseaseApi from "../../API/disease/remove";
// import updateDiseaseApi from "../../API/disease/update";
import ApiPut from "API/put";
import ApiDelete from "API/delete";

// default values
const diseaseOptions = [
  "سل گاوی",
  "آنتروتوکسمی",
  "شاربن",
  "بروسلوز",
  "آبله ی گوسفندی",
  "آگالاکسی",
  "هاری",
  "تب برفکی",
];

const drugOptions = ["1", "2", "3", "4", "5"];
const effectOptions = ["a", "b", "c", "d", "e"];

export default (props) => {
  console.log("+++++++++++++++++++++++++++++", props);
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [date, setDate] = useState();
  const [disease, setDisease] = useState("");
  const [diseaseError, setDiseaseError] = useState("");
  const [comment, setComment] = useState("");

  // new step
  const [newStep, setNewStep] = useState(false);
  const [drugs, setDrugs] = useState([]);
  const [effects, setEffects] = useState([]);
  const [treatment, setTreatment] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleRemoveRecord = (confirmToDeleteOut) => {
    // const data = {
    //   entry: {
    //     key: props.selectedItem._key,
    //   },
    //   confirmToDeleteOut,
    //   token: localStorage.artimal,
    // };
    // console.log("remove button clicked :: key is ", data);

    ApiDelete(
      `api/v0/disease/${localStorage.artimal}/${props.selectedItem._key}/${props.animalKey}/${confirmToDeleteOut}`
    )
      .then((res) => {
        props.forceUpdate();
        props.handleClose();
        notification(res.result, "success");
      })
      .catch((err) => {
        console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        console.log(err.status);
        if (err.status && err.status === 403) {
          alert(err.error);
          const res = window.confirm(err.error);

          // console.log(res);
          if (res === true) {
            handleRemoveRecord(true);
          }
        } else {
          notification(err.error, "danger");
        }
      });

    // removeDiseaseApi(data)
  };

  const handleSubmit = () => {
    const data = {
      entry: {
        value: disease,
        date,
        key: props.selectedItem._key,
        comment,
      },
      token: localStorage.artimal,
    };

    console.log(data);

    ApiPut("api/v0/disease", data)
      .then((res) => {
        props.forceUpdate();
        props.handleClose();
        notification(res.result, "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleNewStep = () => {
  //   setNewStep(true);
  // };
  /* -------------------------------------------------------------------------- */
  /*                                   effect                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (props.selectedItem) {
      setDate(momentJalaali(props.selectedItem.date));
      setDisease([props.selectedItem.value]);
      setComment(props.selectedItem.comment);
    }
  }, [props]);

  // useEffect(() => {
  //   if (props.isOpen === false) setNewStep(false);
  // }, [props.isOpen]);

  // console.log(".....................XXXXXX", props);
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
          <>
            <DatePicker
              isGregorian={false}
              timePicker={false}
              value={date}
              onChange={(value) => setDate(value)}
            />
            <Label>بیماری</Label>
            <Typeahead
              className="typeahead"
              id="vaccine-typeahead"
              labelKey="name"
              onChange={setDisease}
              options={diseaseOptions}
              placeholder="واکسن را انتخاب کنید"
              selected={disease}
            />
            <p className="error-text-form">{diseaseError}</p>
            <Label for="exampleText">توضیحات</Label>
            <Input
              type="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {/* <p className="error-text-form">{deathCommentError}</p> */}

            <Button color="danger" onClick={() => handleRemoveRecord(false)}>
              پاک کردن
            </Button>
          </>
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
