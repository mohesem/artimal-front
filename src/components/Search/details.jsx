import React, { useState, useEffect } from "react";
import momentJalaali from "moment-jalaali";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  Table,
  CardFooter,
} from "reactstrap";

// api

export default (props) => {
  const handleEntryType = () => {
    if (props.selectedAnimal.entryType === 0) return "تولد";
    if (props.selectedAnimal.entryType === 1) return "خرید";
    return "موجودی پیشین";
  };

  const handleEntrySex = () => {
    if (props.selectedAnimal.sex === 0) return "نر";
    return "ماده";
  };

  const handleAge = () => {
    const start = momentJalaali(new Date());
    const end = momentJalaali(props.selectedAnimal.birthDate);
    const duration = momentJalaali.duration(start.diff(end));
    const months = Math.round(duration.as("months"));
    if (months >= 1) {
      return `${months} ماه`;
    } else {
      const days = Math.round(duration.as("days"));
      return `${days} روز`;
    }
  };

  console.log(props.selectedAnimal);
  return (
    <>
      {Object.keys(props.selectedAnimal).length ? (
        <Card className="demo-icons">
          <CardHeader>
            <CardTitle tag="h6">
              {props.selectedAnimal.type} پلاک {props.selectedAnimal._key}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Table>
              <thead className="text-primary">
                <tr>
                  <th>نژاد</th>
                  <th>جنسیت</th>
                  <th>نوع ورود</th>
                  <th>تاریخ ورود</th>
                  <th>تاریخ تولد</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{props.selectedAnimal.race}</td>
                  <td>{handleEntrySex()}</td>
                  <td>{handleEntryType()}</td>
                  <td>
                    {momentJalaali(props.selectedAnimal.entryDate).format(
                      "jYYYY/jM/jD"
                    )}
                  </td>
                  <td>
                    {momentJalaali(props.selectedAnimal.birthDate).format(
                      "jYYYY/jM/jD"
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
            <p>
              <span>سن : </span>
              {handleAge()}
            </p>
          </CardBody>
          <CardFooter className="button-group">
            <Button
              type="button"
              color="primary"
              size="small"
              onClick={() => props.updateTool("weight")}
            >
              وزن
            </Button>
            <Button
              type="button"
              color="primary"
              size="small"
              onClick={() => props.updateTool("vaccine")}
            >
              واکسن
            </Button>
            <Button
              type="button"
              color="primary"
              size="small"
              onClick={() => props.updateTool("exit")}
            >
              خروج
            </Button>
            {/* <Button
              type="Button"
              color="primary"
              size="small"
              onClick={() => props.updateTool("milk")}
            >
              شیر
            </Button> */}
            {props.selectedAnimal.sex === 1 ? (
              <Button
                type="Button"
                color="primary"
                size="small"
                onClick={() => props.updateTool("pregnancy")}
              >
                بارداری
              </Button>
            ) : null}
            <Button
              type="Button"
              color="primary"
              size="small"
              onClick={() => props.updateTool("disease")}
            >
              بیماری
            </Button>
          </CardFooter>
        </Card>
      ) : null}
    </>
  );
};
