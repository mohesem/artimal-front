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
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

// api
import readAnimalApi from "API/readAnimal";
import ApiGet from "API/get";
import ApiPost from "API/post";
// import putAnimalAPI from "API/putAnimal";
// import getActivePregnancy from "API/pregnancy/getActive";

const formatter = new Intl.NumberFormat("sv-SE", {
  style: "decimal",
  currency: "SEK",
});

export default (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */

  const [entryType, setEntryType] = useState(0);
  // const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [key, setKey] = useState("");
  const [type, setType] = useState("");
  const [race, setRace] = useState("");
  const [fatherKey, setFatherKey] = useState("");
  const [motherKey, setMotherKey] = useState("");
  const [gene, setGene] = useState("");
  const [mother, setMother] = useState();

  // NOTE: 0 is male
  // NOTE: 1 is female
  const [sex, setSex] = useState(0);

  const entryDate = momentJalaali();
  const [birthDate, setBirthDate] = useState(momentJalaali());
  const [shopDate, setShopDate] = useState();

  const [touched, setTouched] = useState({
    // price: false,
    weight: false,
    key: false,
    fatherKey: false,
    motherKey: false,
  });

  const [errors, setErrors] = useState({
    // price: {},
    shopDate: {},
    weight: {},
    key: {},
    fatherKey: {},
    motherKey: {},
    type: {},
    race: {},
    gene: {},
  });

  const [fatherOptions, setFatherOptions] = useState([]);
  const [motherOptions, setMotherOptions] = useState([]);
  const [pregnancyKey, setPregnancyKey] = useState("");
  // const [getNewKeyOnProgress, setGetNewKeyOnProgress] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                  handlers                                  */
  /* -------------------------------------------------------------------------- */
  const handleTouched = (name) => {
    if (!touched[name]) {
      const newTouched = {};
      newTouched[name] = true;
      setTouched({ ...touched, ...newTouched });
    }
  };

  const handleRace = () => {
    if (type === "گوسفند") {
      return (
        <>
          {!race ? <option>نژاد دام را انتخاب کنید</option> : null}
          <option>افشاری</option>
          <option>قزل افشاری</option>
          <option>مهربان</option>
          <option>رامنی</option>
          <option>لری</option>
          <option>شال</option>
          <option>مغانی</option>
          <option>رومن</option>
        </>
      );
    }
    if (type === "بز") {
      return (
        <>
          {!race ? <option>نژاد دام را انتخاب کنید</option> : null}
          <option>ایرانی</option>
          <option>پاکستانی</option>
          <option>آلپاین</option>
          <option>سانن</option>
        </>
      );
    }
    if (type === "اسب") {
      return (
        <>
          {!race ? <option>نژاد دام را انتخاب کنید</option> : null}
          <option>سلیمی</option>
          <option>ایرانی</option>
        </>
      );
    }
    if (type === "سگ") {
      return (
        <>
          {!race ? <option>نژاد دام را انتخاب کنید</option> : null}
          <option>ژرمن</option>
        </>
      );
    }
    return null;
  };

  const handleKeyFather = (value) => {
    setFatherKey(value);
    readAnimalApi({ key: value, sex: 0, type, limit: 10 })
      .then((res) => {
        setFatherOptions(res.results);
        if (value.length === 6 && res.results[0].key === value) {
          setFatherOptions([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyMother = (value) => {
    setMotherKey(value);

    const q = `limit:10&&sex:1&&key:${value}&&type:${type}&&race:${race}`;

    ApiGet(`api/v0/animal/stock/${q}`)
      .then((res) => {
        console.log("mother res is :::::::::", res);
        if (!res.result.length) {
          notification("دامی پیدا نشد", "warning");
          if (motherOptions.length) setMotherOptions([]);
        }
        //  else if (value.length === 6 && res.result[0].key === value) {
        //   setMotherOptions([]);
        // }
        else {
          setMotherOptions(res.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFatherKeySelect = (_key) => {
    setFatherOptions([]);
    setFatherKey(_key);
    console.log(_key);
  };
  const handleMotherKeySelect = (mother) => {
    setMotherOptions([]);
    console.log({ mother });
    // setMotherKey(mother._key);
    setMother(mother);
  };

  useEffect(() => {
    const newErrors = {};

    /* ------------------------------ fatherKey ------------------------------ */
    if (
      !fatherKey.length &&
      !errors.fatherKey.isRequired &&
      touched.fatherKey &&
      entryType === 0
    ) {
      const error = "ورود پلاک پدر برای دامهای متولد شده الزامی است";
      if (!newErrors.fatherKey) newErrors.fatherKey = {};
      newErrors.fatherKey.isRequired = error;
    }
    if (fatherKey.length && errors.fatherKey.isRequired) {
      delete errors.fatherKey.isRequired;
    }
    /* ------------------------------ mother key ----------------------------- */
    if (
      !motherKey.length &&
      !errors.motherKey.isRequired &&
      touched.motherKey &&
      entryType === 0
    ) {
      const error = "ورود پلاک مادر برای دامهای متولد شده الزامی است";
      if (!newErrors.motherKey) newErrors.motherKey = {};
      newErrors.motherKey.isRequired = error;
    }

    if (motherKey.length && errors.motherKey.isRequired) {
      delete errors.motherKey.isRequired;
    }
    /* --------------------------------- weight --------------------------------- */
    if (touched.weight && !weight.length && !errors.weight.isRequired) {
      const error = "ورود وزن الزامی است";
      if (!newErrors.weight) newErrors.weight = {};
      newErrors.weight.isRequired = error;
    }
    if (weight.length && errors.weight.isRequired) {
      delete errors.weight.isRequired;
    }

    /* --------------------------------- key --------------------------------- */
    if (key.length && errors.key.serverErr) {
      delete errors.key.serverErr;
    }
    // /* ---------------------------------- price --------------------------------- */
    // if (
    //   entryType === 1 &&
    //   touched.price &&
    //   !price.length &&
    //   !errors.price.isRequired
    // ) {
    //   const error = "ورود قیمت برای دام خریداری شده الزامی است";
    //   if (!newErrors.price) newErrors.price = {};
    //   newErrors.price.isRequired = error;
    // }
    // if (price.length && errors.price.isRequired) {
    //   delete errors.price.isRequired;
    // }

    /* ---------------------------------- race ---------------------------------- */
    if (race.length && errors.race.isRequired) {
      delete errors.race.isRequired;
    }

    if (type === "گاو" && errors.race.isRequired) {
      delete errors.race.isRequired;
    }

    /* ---------------------------------- gene ---------------------------------- */
    if (type !== "گوسفند" && errors.gene.isRequired) {
      delete errors.race.isRequired;
    }

    if (type === "گوسفند" && gene && errors.gene.isRequired) {
      delete errors.gene.isRequired;
    }
    /* ---------------------------------- type ---------------------------------- */
    if (type.length && errors.type.isRequired) {
      delete errors.type.isRequired;
    }

    /* ----------------------------- changing state ----------------------------- */
    if (Object.keys(newErrors).length) {
      setErrors({ ...errors, ...newErrors });
    }
  }, [
    entryType,
    errors,
    fatherKey,
    gene,
    key,
    motherKey,
    race,
    touched,
    type,
    weight,
  ]);

  // handleFormValidation();

  const formValidationOnSubmit = (cb) => {
    const newErrors = {};

    /* ------------------------------ fatherKey ------------------------------ */
    if (!fatherKey.length && !errors.fatherKey.isRequired && entryType === 0) {
      const error = "ورود پلاک پدر برای دامهای متولد شده الزامی است";
      if (!newErrors.fatherKey) newErrors.fatherKey = {};
      newErrors.fatherKey.isRequired = error;
    }
    /* ------------------------------ mother key ----------------------------- */
    if (!motherKey.length && !errors.motherKey.isRequired && entryType === 0) {
      const error = "ورود پلاک مادر برای دامهای متولد شده الزامی است";
      if (!newErrors.motherKey) newErrors.motherKey = {};
      newErrors.motherKey.isRequired = error;
    }
    /* --------------------------------- weight --------------------------------- */
    if (!weight.length && !errors.weight.isRequired) {
      const error = "ورود وزن الزامی است";
      if (!newErrors.weight) newErrors.weight = {};
      newErrors.weight.isRequired = error;
    }

    /* ---------------------------------- gene ---------------------------------- */
    if (type === "گوسفند" && !gene && !errors.gene.isRequired) {
      const error = "ورود ژن برای گوسفند الزامی است";
      if (!newErrors.gene) newErrors.gene = {};
      newErrors.gene.isRequired = error;
    }

    // /* ---------------------------------- price --------------------------------- */
    // if (entryType === 1 && !price.length && !errors.price.isRequired) {
    //   const error = "ورود قیمت برای دام خریداری شده الزامی است";
    //   if (!newErrors.price) newErrors.price = {};
    //   newErrors.price.isRequired = error;
    // }

    /* -------------------------------- shop date ------------------------------- */
    if (entryType === 1 && !shopDate && !errors.shopDate.isGregorian) {
      const error = "ورود تاریخ خرید الزامی است";
      if (!newErrors.shopDate) newErrors.shopDate = {};
      newErrors.shopDate.isRequired = error;
    }

    /* ---------------------------------- race ---------------------------------- */
    if (!race && type !== "گاو") {
      const error = "ورود نژاد دام الزامی است";
      if (!newErrors.race) newErrors.race = {};
      newErrors.race.isRequired = error;
    }

    /* ---------------------------------- type ---------------------------------- */
    if (!type) {
      const error = "ورود نوع دام الزامی است";
      if (!newErrors.type) newErrors.type = {};
      newErrors.type.isRequired = error;
    }
    /* ----------------------------- changing state ----------------------------- */
    return cb(newErrors);
  };

  const handleFormSubmit = async () => {
    formValidationOnSubmit((newErrors) => {
      // const splitEntryDate = entryDate
      //   .locale('fa')
      //   .format('jYYYY/jM/jD')
      //   .split('/');

      //   const splitBirthDate = birthDate
      //     .locale('fa')
      if (!Object.keys(newErrors).length) {
        const data = {
          animal: {
            entryType,
            entryDate,
            birthDate,
            // price: Number(price),
            shopDate,
            pregnancyKey,
            weight: Number(weight),
            key,
            type,
            race,
            sex,
            fatherKey,
            motherKey,
            gene,
          },
          token: localStorage.artimal,
        };
        ApiPost("api/v0/animal/new", data)
          .then((res) => {
            notification(res.result, "success");

            props.handleClose();
            setKey("");
            // console.log(".....", res);

            setEntryType(0);
            setPregnancyKey("");
            setWeight("");
            setKey("");
            setType("");
            setRace("");
            setFatherKey("");
            setMotherKey("");
            setTouched({
              // price: false,
              weight: false,
              key: false,
              fatherKey: false,
              motherKey: false,
            });
          })
          .catch((err) => {
            console.log(err);
            notification(err.error, "danger");
          });
        console.log("sending request");
      } else {
        setErrors({ ...errors, ...newErrors });
      }
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                 conditions                                 */
  /* -------------------------------------------------------------------------- */

  if (!fatherKey && fatherOptions.length) {
    setFatherOptions([]);
  }

  if (!motherKey && motherOptions.length) {
    setMotherOptions([]);
  }

  // if (!key && !getNewKeyOnProgress) {
  //   console.log();
  //   setGetNewKeyOnProgress(true);
  //   // let counter = 0;

  //   ApiGet("api/v0/animal/newKey")
  //     .then((res) => {
  //       console.log("current animal keys", res);
  //       const keyString = String(100000 + res.result);
  //       setGetNewKeyOnProgress(false);
  //       setKey(keyString);
  //     })
  //     .catch((err) => {
  //       setTimeout(() => {
  //         setGetNewKeyOnProgress(false);
  //       }, 3000);

  //       errors.key.serverErr = "خطای سروی";
  //       console.log(err);
  //     });
  // }

  /* -------------------------------------------------------------------------- */
  /*                                   effects                                  */
  /* -------------------------------------------------------------------------- */

  // if (res.details.pregnant !== true) {
  //   if (!errors.motherKey.isNotPregnant)
  //     setErrors({
  //       ...errors,
  //       motherKey: {
  //         ...errors.motherKey,
  //         isNotPregnant: "دام انتخاب شده بارداری فعالی  ندارد",
  //       },
  //     });
  // } else {
  useEffect(() => {
    // ApiGet(`api/v0/animal/detail/${motherKey}`)
    //     .then((res) => {
    //       console.log("res is ::: ", res);

    //       ApiGet(`api/v0/animal/pregnancy/${motherKey}`).then((res) => {
    //         console.log("-------------", res);
    //         if (!res.result.length) {
    //           notification("بارداری ای برای این دام ثبت نشده هاست", "danger");
    //           setFatherKey("");
    //         } else setFatherKey(res.result[0].male._key);
    //       });
    //       console.log("get father key");
    //     })
    //     .catch((err) => console.log(err));

    if (mother) {
      ApiGet(`api/v0/animal/pregnancy/${mother.key}`).then((res) => {
        console.log("-------------", res);
        if (!res.result.length) {
          notification("بارداری ای برای این دام ثبت نشده هاست", "danger");
          setFatherKey("");
        } else {
          setFatherKey(res.result[0].male._key);
          setPregnancyKey(res.result[0].pregnancy._key);
        }
      });
    }
  }, [mother]);

  useEffect(() => {
    setFatherKey("");
  }, [motherKey]);

  useEffect(() => {
    setMother();
    setMotherKey("");
  }, [race, type]);

  useEffect(() => {
    if (entryType !== 1 && errors.shopDate.isRequired)
      delete errors.shopDate.isRequired;
  }, [entryType, errors.shopDate.isRequired]);

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
          ورود دام جدید
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>نحوه ی ورود</Label>
              <div style={{ display: "flex" }}>
                <FormGroup check>
                  <Label check>
                    <span>تولد</span>
                    <Input
                      type="radio"
                      onChange={() => setEntryType(0)}
                      checked={entryType === 0}
                    />
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <span>خرید</span>
                    <Input
                      type="radio"
                      onChange={() => setEntryType(1)}
                      checked={entryType === 1}
                    />
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <span>موجودی سابق</span>
                    <Input
                      type="radio"
                      onChange={() => setEntryType(2)}
                      checked={entryType === 2}
                    />
                  </Label>
                </FormGroup>
              </div>
            </FormGroup>
            <FormGroup>
              <Label>تاریخ تولد</Label>
              <FormGroup>
                <DatePicker
                  isGregorian={false}
                  timePicker={false}
                  value={birthDate}
                  onChange={(value) => setBirthDate(value)}
                />
              </FormGroup>
            </FormGroup>
            {entryType === 1 ? (
              <FormGroup>
                <Label>تاریخ خرید</Label>
                <FormGroup>
                  <DatePicker
                    isGregorian={false}
                    timePicker={false}
                    value={shopDate}
                    onChange={(value) => setShopDate(value)}
                  />
                </FormGroup>
                {Object.keys(errors.shopDate).map((name, i) => {
                  return (
                    <p className="error-text-form" key={`shopDate${i}`}>
                      {errors.shopDate[name]}
                    </p>
                  );
                })}
              </FormGroup>
            ) : null}

            <FormGroup>
              <Label>جنسیت</Label>
              <div style={{ display: "flex" }}>
                <FormGroup check>
                  <Label check>
                    <span>نر</span>
                    <Input
                      type="radio"
                      onChange={() => setSex(0)}
                      checked={sex === 0}
                    />
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <span>ماده</span>
                    <Input
                      type="radio"
                      onChange={() => setSex(1)}
                      checked={sex === 1}
                    />
                  </Label>
                </FormGroup>
              </div>
            </FormGroup>
            <FormGroup>
              <Label>نوع</Label>
              <FormGroup>
                <Input
                  className="select-input"
                  type="select"
                  onChange={(e) => {
                    setType(e.target.value);
                    setRace("");
                  }}
                  isValid={type}
                  // isInvalid={Object.keys(errors.type).length || !type}
                >
                  {!type ? <option>نوع دام را انتخاب کنید</option> : null}
                  <option>گوسفند</option>
                  <option>بز</option>
                  <option>اسب</option>
                  <option>گاو</option>
                  <option>سگ</option>
                </Input>
              </FormGroup>
              {Object.keys(errors.type).map((name, i) => {
                return (
                  <p className="error-text-form" key={`type${i}`}>
                    {errors.type[name]}
                  </p>
                );
              })}
            </FormGroup>
            <FormGroup>
              <Label>نژاد</Label>
              <FormGroup>
                <Input
                  className="select-input"
                  type="select"
                  disabled={!type || type === "گاو"}
                  value={race}
                  onChange={(e) => setRace(e.target.value)}
                  isValid={type && race}
                  // isInvalid={type && (Object.keys(errors.race).length || !race)}
                >
                  {handleRace()}
                </Input>
              </FormGroup>
              {Object.keys(errors.race).map((name, i) => {
                return (
                  <p className="error-text-form" key={`race${i}`}>
                    {errors.race[name]}
                  </p>
                );
              })}
            </FormGroup>
            {type === "گوسفند" ? (
              <FormGroup>
                <Label>ژن</Label>
                <FormGroup>
                  <Input
                    className="select-input"
                    type="select"
                    value={gene}
                    onChange={(e) => setGene(e.target.value)}
                    // isValid={type && race}
                    // isInvalid={type && (Object.keys(errors.race).length || !race)}
                  >
                    {!gene ? <option>ژن دام را انتخاب کنید</option> : null}
                    <option>معمولی</option>
                    <option>هترو</option>
                    <option>همو</option>ٌ
                  </Input>
                </FormGroup>
                {Object.keys(errors.gene).map((name, i) => {
                  return (
                    <p className="error-text-form" key={`race${i}`}>
                      {errors.gene[name]}
                    </p>
                  );
                })}
              </FormGroup>
            ) : null}

            {entryType === 0 ? (
              <>
                <FormGroup>
                  <Label>پلاک مادر</Label>
                  <Input
                    disabled={!type || (type !== "گاو" && !race)}
                    placeholder="پلاک مادر"
                    value={motherKey}
                    onChange={(e) => {
                      handleKeyMother(e.target.value);
                      handleTouched("motherKey");
                    }}
                    isValid={
                      type &&
                      race &&
                      touched.motherKey &&
                      !Object.keys(errors.motherKey).length
                    }
                    // isInvalid={
                    //   type &&
                    //   race &&
                    //   (Object.keys(errors.motherKey).length || !motherKey)
                    // }
                    type="text"
                  />
                  {motherOptions.length ? (
                    <ListGroup className="input-options">
                      {motherOptions.map((o, i) => {
                        return (
                          <ListGroupItem
                            key={`listItem${i}`}
                            action
                            onClick={() => handleMotherKeySelect(o)}
                            // variant={i % 2 === 0 ? "info" : "primary"}
                            type="button"
                          >
                            <Row>
                              <Col>{o.key}</Col>
                              <Col>{o.type}</Col>
                              <Col>{o.race}</Col>
                            </Row>
                          </ListGroupItem>
                        );
                      })}
                    </ListGroup>
                  ) : null}
                  {Object.keys(errors.motherKey).map((name, i) => {
                    return (
                      <p className="error-text-form" key={`motherKey${i}`}>
                        {errors.motherKey[name]}
                      </p>
                    );
                  })}
                </FormGroup>
                <FormGroup>
                  <Label>پلاک پدر</Label>
                  <Input
                    disabled
                    placeholder="پلاک پدر"
                    value={fatherKey}
                    onChange={(e) => {
                      handleKeyFather(e.target.value);
                      handleTouched("fatherKey");
                    }}
                    isValid={
                      type &&
                      race &&
                      touched.fatherKey &&
                      !Object.keys(errors.fatherKey).length
                    }
                    // isInvalid={
                    //   type &&
                    //   race &&
                    //   (Object.keys(errors.fatherKey).length || !fatherKey)
                    // }
                    type="text"
                  />
                  {fatherOptions.length ? (
                    <ListGroup className="input-options">
                      {fatherOptions.map((o, i) => {
                        return (
                          <ListGroupItem
                            key={`listItem${i}`}
                            action
                            onClick={() => handleFatherKeySelect(o.key)}
                            // variant={i % 2 === 0 ? "info" : "primary"}
                            type="button"
                          >
                            <Row>
                              <Col>{o.key}</Col>
                              <Col>{o.type}</Col>
                              <Col>{o.race}</Col>
                            </Row>
                          </ListGroupItem>
                        );
                      })}
                    </ListGroup>
                  ) : null}
                  {Object.keys(errors.fatherKey).map((name, i) => {
                    return (
                      <p className="error-text-form" key={`fatherKey${i}`}>
                        {errors.fatherKey[name]}
                      </p>
                    );
                  })}
                </FormGroup>
              </>
            ) : null}
            {/* {entryType === 1 ? (
              <FormGroup>
                <Label>قیمت</Label>
                <FormGroup>
                  <Input
                    placeholder="به تومان"
                    value={formatter.format(price)}
                    onChange={(e) => {
                      console.log("=====", e.target.value.replace(/\s/g, ""));
                      setPrice(e.target.value.replace(/\s/g, ""));
                      handleTouched("price");
                    }}
                    isValid={touched.price && !Object.keys(errors.price).length}
                    // isInvalid={Object.keys(errors.price).length || !price}
                    type="text"
                  />
                </FormGroup>
                {Object.keys(errors.price).map((name, i) => {
                  return (
                    <p className="error-text-form" key={`price${i}`}>
                      {errors.price[name]}
                    </p>
                  );
                })}
              </FormGroup>
            ) : null} */}
            <FormGroup>
              <Label>{entryType === 0 ? "وزن تولد" : "وزن هنگام ورود"}</Label>
              <FormGroup>
                <Input
                  placeholder="به کیلوگرم"
                  value={weight}
                  onChange={(e) => {
                    console.log(e);
                    setWeight(e.target.value);
                    handleTouched("weight");
                  }}
                  isValid={touched.weight && !Object.keys(errors.weight).length}
                  type="number"
                ></Input>
              </FormGroup>
              {Object.keys(errors.weight).map((name, i) => {
                return (
                  <p className="error-text-form" key={`weight${i}`}>
                    {errors.weight[name]}
                  </p>
                );
              })}
            </FormGroup>
            <FormGroup>
              <Label>شماره پلاک</Label>
              <FormGroup>
                <Input
                  type="number"
                  defaultValue={key}
                  onChange={(e) => setKey(e.target.value)}
                />
              </FormGroup>
              {Object.keys(errors.key).map((name, i) => {
                return (
                  <p className="error-text-form" key={`key${i}`}>
                    {errors.key[name]}
                  </p>
                );
              })}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="button" onClick={handleFormSubmit}>
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
