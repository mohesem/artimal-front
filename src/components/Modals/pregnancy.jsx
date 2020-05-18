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
  Table,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";

// api
// import readPregnancyDetailsApi from "../../API/pregnancy/readDetails";
// import removePregnancyApi from "../../API/pregnancy/remove";
import ApiGet from "API/get";
import ApiDelete from "API/delete";

export default (props) => {
  const [pregnancyDetails, setPregnancyDetails] = useState([]);
  const [femaleKey, setFemaleKey] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleRemoveRecord = () => {
    console.log("deleeeeeeeeeeeeeeeeeeeeeete", femaleKey);
    // const data = {
    //   entry: {
    //     key: props.selectedItem.pregnancy._key,
    //     femaleKey: femaleKey,
    //   },
    //   token: localStorage.artimal,
    // };

    ApiDelete(
      `api/v0/pregnancy/${localStorage.artimal}/${props.selectedItem.pregnancy._key}`
    )
      .then((res) => {
        console.log("------------", res);
        notification(res.result, "success");
        props.forceUpdate();
        props.handleClose();
      })
      .catch((err) => {
        if (err.error) {
          console.log(err);
          notification(err.error, "danger");
        } else notification("خطا در برقراری ارتباط", "danger");
      });

    // removePregnancyApi(data)
    //   .then((res) => {
    //     console.log("------------", res);
    //     notification(res.result, "success");
    //     props.forceUpdate();
    //     props.handleClose();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     notification(err.error, "danger");
    //   });
  };
  /* -------------------------------------------------------------------------- */
  /*                                   effect                                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    console.log("========================", props);
    if (props.isOpen) {
      ApiGet(`api/v0/pregnancy/details/${props.selectedItem.pregnancy._key}`)
        .then((res) => {
          console.log("------------", res);
          setPregnancyDetails(res.result);
          // notification(res.result, "success");
          // props.forceUpdate();
          // props.handleClose();
        })
        .catch((err) => {
          if (err.error) {
            console.log(err);
            notification(err.error, "danger");
          } else {
            notification("خطا در برقراری ارتباط", "danger");
          }
        });
    }
  }, [props]);

  /* -------------------------------------------------------------------------- */
  /*                                   return                                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        handlePopOverTo={props.handleClose}
        // className={className}
      >
        <ModalHeader
        // handlePopOverTo={handlePopOverTo}
        >
          ویرایش
        </ModalHeader>
        <ModalBody>
          {/* {handleBody()} */}
          <h5>نتیجه</h5>
          {pregnancyDetails.length ? (
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>جنسیت</th>
                  <th>پلاک</th>
                  <th>وزن زمان تولد</th>
                </tr>
              </thead>
              <tbody>
                {pregnancyDetails.map((element, i) => {
                  console.log("iiiiiiiiii :::::::", i);
                  return (
                    <tr key={element._id + i}>
                      <td>{element.sex === 0 ? "نر" : "ماده"}</td>
                      <td>{element._key}</td>
                      <td>{element.weight.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <p>برای این بارداری نتیجه ای ثبت نشده است</p>
          )}

          <h5>پارامترها</h5>

          <Button
            color="danger"
            onClick={handleRemoveRecord}
            // disabled
            onMouseEnter={() => pregnancyDetails.length && setPopoverOpen(true)}
            onMouseLeave={() =>
              pregnancyDetails.length && setPopoverOpen(false)
            }
            id="Popover1"
          >
            پاک کردن
          </Button>
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target="Popover1"
            className="popover-danger"
          >
            <PopoverHeader>اخطار</PopoverHeader>
            <PopoverBody>
              پاک کردن این رکورد دام هایی که نتیجه ی این بارداری بوده اند را
              دچار مشکل میکند. در صورتی که راهی جز پاک کردن این رکورد وجود ندارد
              لطفا با مراجعه به بخش ارورها نسبت به رفع مشکلاتی که متعاقبا به
              وجود خواهد آمد اقدام کنید
            </PopoverBody>
          </Popover>
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
