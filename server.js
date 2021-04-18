const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log("Server on: ", `http://localhost:${app.get("port")}`);
});
