const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4040;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public"));
});

app.use("/api", require("./routes/customer"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
