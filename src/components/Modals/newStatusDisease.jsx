import React, { useState } from "react";
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
// import createDiseaseRelatedApi from "../../API/disease/createRelated";
// import updateVaccineApi from "../../API/vaccine/update";
import ApiPost from "API/post";

// default values
const drugOptions = ["1", "2", "3", "4", "5"];
const effectOptions = ["a", "b", "c", "d", "e"];

export default (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [date, setDate] = useState(momentJalaali());
  const [comment, setComment] = useState("");

  // new step
  const [drugs, setDrugs] = useState([]);
  const [effects, setEffects] = useState([]);
  const [treatment, setTreatment] = useState("");
  const [isCured, setIsCured] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleRemoveRecord = () => {
    // const data = {
    //   entry: {
    //     key: props.selectedItem.vaccine._key,
    //   },
    //   token: localStorage.artimal,
    // };
    // console.log("remove buttomn clicked :: key is ", data);
    // removeVaccineApi(data)
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
    if (
      !comment &&
      !drugs.length &&
      !treatment &&
      !effects.length &&
      !isCured
    ) {
      notification("همه ی فیلدها خالی است", "danger");
    } else {
      const data = {
        entry: {
          drugs,
          effects,
          key: props.selectedItem._key,
          animalKey: props.animalKey,
          date,
          treatment,
          comment,
          isCured,
        },
        token: localStorage.artimal,
      };
      console.log(data);
      ApiPost("api/v0/disease/step", data)
        .then((res) => {
          props.forceUpdate();
          props.handleClose();
          notification(res.result, "success");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   effect                                   */
  /* -------------------------------------------------------------------------- */

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
            <Label for="exampleText">توضیحات</Label>
            <Input
              type="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {/* <p className="error-text-form">{deathCommentError}</p> */}
            <Label>داروها</Label>
            <Typeahead
              clearButton
              // defaultSelected={drugOptions.slice(0, 5)}
              id="selections-example"
              labelKey="name"
              multiple
              options={drugOptions}
              onChange={setDrugs}
              value={drugs}
              placeholder="Choose a state..."
            />
            <Label>اقدامات درمانی</Label>
            <Input
              type="textarea"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
            />
            <Label>عوارض بیماری</Label>
            <Typeahead
              clearButton
              // defaultSelected={drugOptions.slice(0, 5)}
              id="selections-example"
              labelKey="name"
              multiple
              options={effectOptions}
              onChange={setEffects}
              value={effects}
              placeholder="Choose a state..."
            />
            <div>
              <Label
                check
                style={{
                  position: "unset",
                  verticalAlign: "middle",
                }}
              >
                <Input
                  check
                  style={{ marginRight: "10" }}
                  type="checkbox"
                  checked={isCured}
                  onChange={() => setIsCured(!isCured)}
                />
                <span style={{ marginRight: 22 }}>درمان</span>
              </Label>
            </div>
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
