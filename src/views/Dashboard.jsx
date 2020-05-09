import React, { useState, useEffect } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// moment-jalaali
import momentJalaali from "moment-jalaali";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Spinner,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.jsx";

// api
import ApiGet from "API/get";

export default (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                   states                                   */
  /* -------------------------------------------------------------------------- */
  const [totalAnimal, setTotalAnimal] = useState("");
  const [thisMonthExpense, setThisMonthExpense] = useState("");

  useEffect(() => {
    ApiGet("api/v0/animal/total")
      .then((res) => {
        setTotalAnimal(res.result);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const currnetYM = momentJalaali().format("jYYYY/jM");
    console.log("......^^^^^^^^^.........");
    const firstDayOfMonth = currnetYM + "/1 00:00";

    // TODO: create from dynamic
    // const from = `${momentJalaali("1399/2/1 00:00", "jYYYY/jM/jD HH:mm").format(
    //   "YYYY-M-DTHH:mm:ss.SSS"
    // )}Z`;

    const from = `${momentJalaali(firstDayOfMonth, "jYYYY/jM/jD HH:mm").format(
      "YYYY-M-DTHH:mm:ss.SSS"
    )}Z`;

    const to = `${momentJalaali().format("YYYY-M-DTHH:mm:ss.SSS")}Z`;
    ApiGet(`api/v0/expenses/${from}/${to}`)
      .then((res) => {
        console.log("--------", res);
        setThisMonthExpense(res.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">تعداد کل دام ها</p>
                      <CardTitle tag="p">
                        {totalAnimal ? (
                          totalAnimal
                        ) : (
                          <Spinner type="grow" color="secondary" />
                        )}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">هزینه ها</p>
                      <CardTitle tag="p">
                        {" "}
                        {thisMonthExpense ? (
                          thisMonthExpense
                        ) : (
                          <Spinner type="grow" color="secondary" />
                        )}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> ماه جاری
                </div>
              </CardFooter>
            </Card>
          </Col>
          {/* <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> موجوودی کنونی
                </div>
              </CardFooter>
            </Card>
          </Col> */}
        </Row>
        {/* <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Users Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        */}
        {/* <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Email Statistics</CardTitle>
                <p className="card-category">Last Campaign Performance</p>
              </CardHeader>
              <CardBody>
                <Pie
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      */}
      </div>
    </>
  );
};
