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

//POST endpoint for finding ___
app.post("/find-complexity", async(req, res) => {
    try{
        const { prompt } = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `
                ${prompt}

                The time complexity of this function is
                ###
            `,
            max_tokens: 64,
            temperature: 0,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
        });
        return res.status(200).json({success: true, data: response.data.choices[0].text});
    }catch(error){
        console.log("error");
        return res.status(400).json({
            success: false,
            error: error.response ? error.response.data : error.message,
        })
    }
})
//run server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server started on port 4000"));