const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const Utils = require('./imageStorage');

const app = express();
const port = 8000;

app.use(bodyParser.json());

// LLM setup
const topics = "Hashmaps, Trees, Linked Lists, Arrays, Strings, Stacks, Queues, Heaps";

// access the LLM, passing in the user input
function processInput(input) {
    // do some processing here
    // ret = (query_engine.query(input))
    const ret = input + `In addition, please also print out which of the following topics this question falls under: ${topics}. You should print out more than one topic if the question falls under more than one of the mentioned topics. You must also print out the name or names of the files that you used to come up with your response. If no source files can be identified, then say 'No Source File Identified'. You should print out more than one file name if the answer you came up with pulled information from more than one file. For the topic of the question, please start that response with 'Topic(s):' and return the topic or topics separated by commas. For example, 'heaps, trees, stacks' or 'Queues' would both be valid responses to have after 'Topic(s):'. For the name or names of relevant files, please start that response with 'File(s)' and follow the same comma separated approach as for 'Topic(s):'. Put the response to the question first, then the 'File(s)', and finally the 'Topic(s)'.`;
    return ret;
}

// Identify topics from the LLM response
function identifyTopics(response) {
    const topicsIndex = response.indexOf("Topic(s):");
    const topicsString = response.slice(topicsIndex + 10);
    const topicsList = topicsString.split(', ');
    return topicsList;
}

// Identify files from the LLM response
function identifyFiles(response) {
    const filesIndex = response.indexOf("File(s):");
    const filesString = response.slice(filesIndex + 9, response.indexOf("Topic(s):") - 1);
    const filesList = filesString.split(', ');
    return filesList;
}

// API Requests

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
