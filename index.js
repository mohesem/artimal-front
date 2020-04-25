// import 'regenerator-runtime/runtime';
import express from "express";
// import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
import Cors from "cors";
import path from "path";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.resolve("build")));
app.use(Cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

app.get("/app", (req, res) => {
  console.log("got the req");
  res.sendFile(path.resolve("build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
