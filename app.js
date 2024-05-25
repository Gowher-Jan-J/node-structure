import express from "express";
import cors from "cors";
import { indexRouter } from "./routes/indexRoutes.js";
import { sequelize, admin } from "./models/models.js";

const app = express();
const port = 3006;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", indexRouter);

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database is created");
  } catch (error) {
    console.log("Error in database creation:", error);
  }
})();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
