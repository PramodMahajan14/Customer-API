const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../", "data", "customers.json");

const loadData = () => {
  return fs
    .readFile(filePath, "utf-8")
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((err) => {
      console.error("Error reading file:", err);
      throw err;
    });
};

const saveData = (data) => {
  return fs
    .writeFile(filePath, JSON.stringify(data), "utf-8")
    .then(() => {
      return "Data written successfully.";
    })
    .catch((err) => {
      return err;
    });
};

module.exports = {
  loadData,
  saveData,
};
