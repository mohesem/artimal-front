import express from "express";

import Cors from "cors";
import path from "path";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.use(Cors());

app.get("/", (req, res) => {
  console.log("got the req");
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
