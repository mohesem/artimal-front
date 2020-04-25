import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import Cors from "cors";
import path from "path";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(Cors());
app.use(express.static(path.resolve("build")));

app.get("/app/*", (req, res) => {
  console.log("got the req ", path.resolve("build", "index.html"));
  res.sendFile(path.resolve("build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
