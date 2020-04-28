import React, { useState, useEffect } from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

// components
import Search from "components/Search/search";
import Details from "components/Search/details";
import WeightRecord from "components/Search/weightRecord";
import WeightTable from "components/Search/weightTable";
import NewWeight from "components/Search/newWeight";
import VaccineTable from "components/Search/vaccineTable";
import NewVaccine from "components/Search/newVaccine";
import Out from "components/Search/out";
import Milk from "components/Search/milk";

//api
import readWeightApi from "../API/readWeight";
import readVaccineApi from "../API/readVaccine";
import getAnimalDetailsApi from "../API/getAnimalDetails";

export default () => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [key, setKey] = useState("");
  const [tool, setTool] = useState("");
  const [weight, setWeight] = useState([]);
  const [vaccine, setVaccine] = useState([]);
  const [update, setUpdate] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState({});

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleUpdateKey = (_key) => {
    console.log(_key);
    setKey(_key);
  };

  const handleUpdateTool = (_tool) => {
    console.log("new tool is :", _tool);
    setTool(_tool);
  };

  const handleUpdateWeight = () => {
    setUpdate(true);
  };

  /* -------------------------------------------------------------------------- */
  /*                                 conditions                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    setUpdate(false);
    const getWeightRecords = () => {
      readWeightApi({ animalKeys: [key] })
        .then((res) => {
          setWeight(res.result);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getVaccineRecords = () => {
      const data = {
        entry: {
          keys: [key],
        },
      };
      readVaccineApi(data)
        .then((res) => {
          console.log("------------", res);
          setVaccine(res.result);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (tool === "weight") {
      getWeightRecords();
    }
    if (tool === "vaccine") {
      getVaccineRecords();
    }
  }, [key, tool, update]);

  useEffect(() => {
    getAnimalDetailsApi(key)
      .then((res) => {
        console.log("...............", res);
        setSelectedAnimal(res.details);
        // key: res.details._key,
        // type: res.details.type,
        // race: res.details.race,
        // entryType: res.details.entryType,
        // entryDate: res.details.entryDate,
        // birthDate: res.details.birthDate,
        // sex: res.details.sex,
      })
      .catch((err) => {
        console.log(err);
      });
  }, [key]);

  console.log("sellected animal is ::: ", selectedAnimal);

  /* -------------------------------------------------------------------------- */
  /*                                   return                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="content">
      <Row>
        <Col md="6">
          <Search updateKey={handleUpdateKey} />
          <Details
            selectedAnimal={selectedAnimal}
            updateTool={handleUpdateTool}
          />
        </Col>
        <Col md="6">
          {tool === "weight" ? (
            <>
              <WeightRecord weightObj={weight} />
              <WeightTable weightObj={weight} />
              {selectedAnimal.out ? null : (
                <NewWeight animalKey={key} forceUpdate={handleUpdateWeight} />
              )}
            </>
          ) : null}
          {tool === "vaccine" ? (
            <>
              <VaccineTable vaccineObj={vaccine} />
              {selectedAnimal.out ? null : (
                <NewVaccine animalKey={key} forceUpdate={handleUpdateWeight} />
              )}
            </>
          ) : null}
          {tool === "out" ? (
            <>
              {selectedAnimal.out ? (
                <p>death detail and update</p>
              ) : (
                <Out animalKey={key} forceUpdate={handleUpdateWeight} />
              )}
            </>
          ) : null}
          {tool === "milk" ? (
            <>
              {selectedAnimal.out ? (
                <p>show history</p>
              ) : (
                <Milk animalKey={key} forceUpdate={handleUpdateWeight} />
              )}
            </>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};
