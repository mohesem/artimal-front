import React from "react";
import momentJalaali from "moment-jalaali";
import { Line } from "react-chartjs-2";
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
// api

const dataset = {
  label: "My First dataset",
  fill: true,
  lineTension: 0.1,
  backgroundColor: "rgba(75,192,192,1)",
  borderColor: "#255f5f",
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  pointBorderColor: "#255f5f",
  pointBackgroundColor: "#fff",
  pointBorderWidth: 5,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: "#ffc107",
  pointHoverBorderColor: "rgba(220,220,220,1)",
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

export default (props) => {
  const labels = props.weightArr.map((w) => {
    return momentJalaali(w.date, "YYYY-M-DTHH:mm:ss.SSSZ").format("jYY-jM-jD");
  });

  console.log("wwwwwwwwwwwwwwwwwwww", props);

  const data = props.weightArr.map((w) => w.value);

  dataset.data = data;

  const weightRecordChart = {
    labels,
    datasets: [dataset],
  };

  return (
    <Card className="demo-icons">
      <CardHeader>
        <CardTitle tag="h6">نمودار تغییر وزن</CardTitle>
      </CardHeader>
      <CardBody>
        <Line data={weightRecordChart} />
      </CardBody>
    </Card>
  );
};
