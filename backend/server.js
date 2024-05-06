require("dotenv").config();
const express = require('express');

const cors = require("cors");
const bodyParser = require("body-parser");
const todoRoute = require("./routes/TodosRoute");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/todos", todoRoute);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database: ", error);
    }
}

startServer();