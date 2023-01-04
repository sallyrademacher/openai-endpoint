const express = require("express");
const { Configuration, OpenAIApi} = require("openai");
require("dotenv").config();

//instantiate server
const app = express();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

//middleware
app.use(express.json());

//run server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server started on port 4000"));