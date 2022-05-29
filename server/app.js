const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const path = require("path");
const initDB = require("./startApp/initDB");

const app = express();
// const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = config.get("port") ?? 8080;

// if (process.env.NODE_ENV === "production") {
//     app.use("/", express.static(path.join(__dirname, "client")));

//     const indexPath = path.join(__dirname, "client", "index.html");
//     app.get("*", (req:any, res) => {
//         res.sendFile(indexPath);
//     });
// }

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"));
        console.log(chalk.green(`MongoDB connected`));
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on port ${PORT}`));
        });
    } catch (error) {
        console.log(chalk.red(error.message));
        process.exit(1);
    }
}

start();
