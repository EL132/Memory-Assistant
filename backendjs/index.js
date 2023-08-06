const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const Utils = require('./imageStorage');

const app = express();
const port = 8000;

app.use(bodyParser.json());


// get function for the images for the React frontend
app.post('/get', async (req, res) => {
    console.log("get request received")
    // try {
    //     const name = req.body.name;
    //     const utility = new Utils();
    //     const imagesData = await utility.get_s3_and_tags(name);
    //     return res.json(imagesData);
    // } catch (error) {
    //     return res.status(500).json({ error: "Internal server error" });
    // }
    return res.json({ error: "this is a get request" });
});

app.post('/getTags', async (req, res) => {
    // try {
    //     const tag = req.body.tag;
    //     const utility = new Utils();
    //     if (tag) {
    //     const imagesData = await utility.get_matching_tags(tag);
    //     return res.json(imagesData);
    //     }
    //     return res.json({ error: "Tag parameter is missing" });
    // } catch (error) {
    //     return res.status(500).json({ error: "Internal server error" });
    // }
    return res.json({ error: "this is a get tags request" });
});

app.post('/post', (req, res) => {
    // try {
    //     const chatPrompt = req.body.chat_prompt;
    //     const processedData = processInput(chatPrompt);
    //     const data = {
    //     processed_data: processedData,
    //     };
    //     console.log(processedData);
    //     return res.json(data);
    // } catch (error) {
    //     return res.status(500).json({ error: "Internal server error" });
    // }
    return res.json({ error: "this is a post request" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});