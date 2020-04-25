import React from "react";
import momentJalaali from "moment-jalaali";
import { Line } from "react-chartjs-2";
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
// api

const dataset = {
  label: "My First dataset",
  fill: false,
  lineTension: 0.1,
  backgroundColor: "rgba(75,192,192,0.4)",
  borderColor: "rgba(75,192,192,1)",
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  pointBorderColor: "rgba(75,192,192,1)",
  pointBackgroundColor: "#fff",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: "rgba(75,192,192,1)",
  pointHoverBorderColor: "rgba(220,220,220,1)",
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

export default (props) => {
  const labels = props.weightObj.map((w) => {
    return momentJalaali(w.createdAt, "YYYY-M-DTHH:mm:ss.SSSZ").format(
      "jYY-jM-jD"
    );
  });

  const data = props.weightObj.map((w) => w.weight);

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
