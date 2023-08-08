const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { spawn } = require('child_process');
//const Utils = require('./imageStorage');

const app = express();
const port = 8000;

app.use(bodyParser.json());

// LLM setup
const topics = "Hashmaps, Trees, Linked Lists, Arrays, Strings, Stacks, Queues, Heaps";

// access the LLM, passing in the user input
function retrieveLLM(input) {

    return new Promise((resolve, reject) => {
        console.log("inside retrieveLLM function");
    
        const pythonProcess = spawn('python', ['../backend/llm_response.py', input]);
    
        let result = '';
    
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python stdout: ${data}`);
            let messageObject = JSON.parse(data);
            console.log(messageObject.message);
            result += data.toString();
        });
    
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python stderr: ${data}`);
            reject(data);
        });
    
        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
            try {
                const jsonResult = JSON.parse(result.trim());
                resolve(jsonResult);
            } catch (error) {
                reject(error);
            }
        });
    });
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

// Route to retrieve the LLM response
app.post('/llm', async (req, res) => {
    try {
        const result = await retrieveLLM(req.body["question"]);
        return res.json({ result });
    } catch (error) {
        console.error('Error calling Python function:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

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
    //return res.json({ error: "this is a get tags request" });
    return res.json({ version: "this is a get tags request" });
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
