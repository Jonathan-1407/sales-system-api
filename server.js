import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import router from "./routes";

/* Database connection to MongoDB */
mongoose.Promise = global.Promise;
const DB_URL = "mongodb://localhost:27017/sales-system";
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.info("Conected to MongoDB");
  })
  .catch(error => {
    console.error(error);
  });

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", router);

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log("Server on: ", `http://localhost:${app.get("port")}`);
});
