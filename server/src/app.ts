const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = config.get("port") ?? 8080;

app.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on port ${PORT}`));
});
