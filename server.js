const express = require("express");
const dotenv = require("dotenv");
const routes = require("./src/routes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Node.js Backend Template");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
