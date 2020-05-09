import React, { useState, useEffect, useCallback } from "react";
import momentJalaali from "moment-jalaali";
// import DatePicker from "react-datepicker2";
// import notification from "../../helpers/notification";
// import { Typeahead } from "react-bootstrap-typeahead";

import { Timeline, TimelineEvent } from "react-event-timeline";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Alert,
} from "reactstrap";

// api
// import getDetailsApi from "API/disease/getDetails";
import ApiGet from "API/get";

export default (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [details, setDetails] = useState([]);
  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   effect                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (props.selectedItem) {
      // console.log("ooooooooooooooooooooooooo", props.selectedItem._key);
      // getDetailsApi(props.selectedItem._key)
      ApiGet(`api/v0/disease/step/${props.selectedItem._key}`)
        .then((res) => {
          console.log("<<<<<<<<<<<<<", res);
          // props.forceUpdate();
          // props.handleClose();
          // notification(res.result, "success");
          setDetails(res.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.selectedItem]);
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
          {props.selectedItem ? props.selectedItem.value : null}
        </ModalHeader>
        <ModalBody>
          <Timeline className="timeline">
            {details.map((step) => {
              return (
                <TimelineEvent
                  className="timeline-event"
                  // title={props.selectedItem.value}
                  createdAt={momentJalaali(
                    step.date,
                    "YYYY-M-DTHH:mm:ss.SSSZ"
                  ).format("jYYYY-jM-jD")}
                >
                  {step.drugs && step.drugs.length ? (
                    <>
                      <h6>داروها</h6>
                      {step.drugs.map((drug) => (
                        <p>{drug}</p>
                      ))}
                    </>
                  ) : null}
                  {step.effects && step.effects.length ? (
                    <>
                      <h6>عوارض</h6>
                      {step.effects.map((effect) => (
                        <p>{effect}</p>
                      ))}
                    </>
                  ) : null}
                  {step.comment && step.comment ? (
                    <>
                      <h6>کامنت</h6>
                      <p>{step.comment}</p>
                    </>
                  ) : null}
                  {step.treatment ? (
                    <>
                      <h6>اقدامات درمانی</h6>
                      <p>{step.treatment}</p>
                    </>
                  ) : null}
                  {step.isCured ? (
                    <h4>
                      <Badge color="success" style={{ padding: 10 }}>
                        درمان
                      </Badge>
                    </h4>
                  ) : null}
                  {step.died ? (
                    <h4>
                      <Badge color="danger" style={{ padding: 10 }}>
                        مرگ
                      </Badge>
                    </h4>
                  ) : null}
                </TimelineEvent>
              );
            })}
          </Timeline>
          {!details.length ? (
            <Alert color="danger">تایخچه ای برای این بیماری ثبت نشده است</Alert>
          ) : null}
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" type="button" onClick={handleSubmit}>
            تایید
          </Button>
          <Button color="secondary" onClick={props.handleClose}>
            انصراف
          </Button> */}
        </ModalFooter>
      </Modal>
    </>
  );
};
