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
import OutHistory from "components/Search/outHistory";
import Milk from "components/Search/milk";
import NewPregnancy from "components/Search/newPregnancy";
import HistoryPregnany from "components/Search/historyPregnancy";
import NewDisease from "components/Search/disease/new";
import HistoryDisease from "components/Search/disease/history";

//api
// import readVaccineApi from "API/vaccine/read";
// import readDiseaseApi from "API/disease/read";
// import getOutApi from "API/out/get";
import ApiGet from "API/get";

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
  const [disease, setDisease] = useState([]);
  const [exit, setExit] = useState();
  // pregnancy
  const [pregnancyRecords, setPregnancyRecords] = useState([]);

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

  const handleUpdate = () => {
    setUpdate(true);
  };

  // const handleUpdatePregnancy = (_key) => {
  //   console.log("-----------------", "key is ::", key);
  //   pregnancyRecords.filter((p) => p.pregnancy._key !== _key);
  // };

  /* -------------------------------------------------------------------------- */
  /*                                 conditions                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    console.log("forceUpdate worked", tool);
    if (update === true) setUpdate(false);

    const getWeightRecords = () => {
      ApiGet(`api/v0/weight/${key}`)
        .then((res) => {
          setWeight(res.result);
        })
        .catch((err) => {
          console.log(err);
        });
      // readWeightApi({ animalKeys: [key] })
    };

    const getVaccineRecords = () => {
      ApiGet(`api/v0/animal/vaccine/${key}`)
        .then((res) => {
          console.log("------------", res);
          setVaccine(res.result);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getPregnancyRecords = () => {
      ApiGet(`api/v0/animal/pregnancy/${key}`)
        .then((res) => {
          console.log("#################", res);
          if (res.result) setPregnancyRecords(res.result);
          else setPregnancyRecords([]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getDiseaseHistory = () => {
      console.log("get disease history ");
      ApiGet(`api/v0/disease/${key}`)
        .then((res) => {
          setDisease(res.result);
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
    if (tool === "pregnancy") {
      getPregnancyRecords();
    }
    if (tool === "disease") {
      getDiseaseHistory();
    }
    if (tool === "exit" && selectedAnimal.exit) {
      // getOutApi(selectedAnimal._key)
      ApiGet(`api/v0/exit/${selectedAnimal._key}`)
        .then((res) => {
          console.log("exit history is :::: ", res);
          setExit(res.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [key, selectedAnimal, tool, update]);

  useEffect(() => {
    ApiGet(`api/v0/animal/detail/${key}`)
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
  }, [key, update]);

  console.log("sellected animal is ::: ", selectedAnimal);

  /* -------------------------------------------------------------------------- */
  /*                                   return                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="content">
      <Row>
        <Col md="6">
          <Search
            updateKey={handleUpdateKey}
            updateSelectedAnimal={setSelectedAnimal}
          />
          <Details
            selectedAnimal={selectedAnimal}
            updateTool={handleUpdateTool}
          />
        </Col>
        <Col md="6">
          {tool === "weight" ? (
            <>
              <WeightRecord weightArr={weight} />
              <WeightTable weightArr={weight} forceUpdate={handleUpdate} />
              {selectedAnimal.exit ? null : (
                <NewWeight animalKey={key} forceUpdate={handleUpdate} />
              )}
            </>
          ) : null}
          {tool === "vaccine" ? (
            <>
              <VaccineTable vaccineArr={vaccine} forceUpdate={handleUpdate} />
              {selectedAnimal.exit ? null : (
                <NewVaccine animalKey={key} forceUpdate={handleUpdate} />
              )}
            </>
          ) : null}
          {tool === "exit" ? (
            <>
              {selectedAnimal.exit ? (
                <OutHistory exit={exit} forceUpdate={handleUpdate} />
              ) : (
                <Out animalKey={key} forceUpdate={handleUpdate} />
              )}
            </>
          ) : null}
          {/* {tool === "milk" ? (
            <>
              {selectedAnimal.out ? (
                <p>show history</p>
              ) : (
                <Milk animalKey={key} forceUpdate={handleUpdateWeight} />
              )}
            </>
          ) : null} */}
          {tool === "disease" ? (
            <>
              {selectedAnimal.exit ? (
                <HistoryDisease
                  diseaseArr={disease}
                  forceUpdate={handleUpdate}
                  animalKey={key}
                />
              ) : (
                <>
                  <HistoryDisease
                    diseaseArr={disease}
                    animalKey={key}
                    forceUpdate={handleUpdate}
                  />
                  <NewDisease animalKey={key} forceUpdate={handleUpdate} />
                </>
              )}
            </>
          ) : null}
          {tool === "pregnancy" ? (
            <>
              <HistoryPregnany
                pregnancyRecords={pregnancyRecords}
                forceUpdate={handleUpdate}
              />
              {selectedAnimal.pregnant !== true ||
              selectedAnimal.exit !== undefined ? (
                <NewPregnancy
                  selectedAnimal={selectedAnimal}
                  forceUpdate={handleUpdate}
                />
              ) : null}
            </>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

/* <HistoryPregnancy animalKey={key} /> */
