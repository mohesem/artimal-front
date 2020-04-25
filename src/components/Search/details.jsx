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
import getAnimalDetailsApi from "../../API/getAnimalDetails";

export default (props) => {
  const [selectedAnimal, setSelectedAnimal] = useState({});
  const [key, setKey] = useState("");

  const handleEntryType = () => {
    if (selectedAnimal.entryType === 0) return "تولد";
    if (selectedAnimal.entryType === 1) return "خرید";
    return "موجودی پیشین";
  };

  const handleEntrySex = () => {
    if (selectedAnimal.sex === 0) return "نر";
    return "ماده";
  };

  const handleAge = () => {
    const start = momentJalaali(new Date());
    const end = momentJalaali(selectedAnimal.birthDate);
    const duration = momentJalaali.duration(start.diff(end));
    const months = Math.round(duration.as("months"));
    if (months >= 1) {
      return `${months} ماه`;
    } else {
      const days = Math.round(duration.as("days"));
      return `${days} روز`;
    }
  };

  useEffect(() => {
    if (props.animalKey !== key) {
      setKey(props.animalKey);
      getAnimalDetailsApi(props.animalKey)
        .then((res) => {
          console.log("...............", res);
          setSelectedAnimal({
            key: res.details._key,
            type: res.details.type,
            race: res.details.race,
            entryType: res.details.entryType,
            entryDate: res.details.entryDate,
            birthDate: res.details.birthDate,
            sex: res.details.sex,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [key, props.animalKey, selectedAnimal]);

  console.log(selectedAnimal);
  return (
    <>
      {Object.keys(selectedAnimal).length ? (
        <Card className="demo-icons">
          <CardHeader>
            <CardTitle tag="h6">
              {selectedAnimal.type} پلاک {selectedAnimal.key}
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
                  <td>{selectedAnimal.race}</td>
                  <td>{handleEntrySex()}</td>
                  <td>{handleEntryType()}</td>
                  <td>
                    {momentJalaali(selectedAnimal.entryDate).format(
                      "jYYYY/jM/jD"
                    )}
                  </td>
                  <td>
                    {momentJalaali(selectedAnimal.birthDate).format(
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
          </CardFooter>
        </Card>
      ) : null}
    </>
  );
};
