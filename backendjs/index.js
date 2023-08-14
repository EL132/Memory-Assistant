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


/* BOTH LLM FUNCTION AND ENDPOINT SETUP BELOW */
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


/* GET IMAGES BY TAGS FUNCTION AND ENDPOINT SETUP BELOW */

function retrieveByTags(input) {
    return new Promise((resolve, reject) => {
        console.log(input)
    
        const pythonProcess = spawn('python', ['../backend/retrieveByTags.py', JSON.stringify(input)]);
    
        let result = '';
    
        pythonProcess.stdout.on('data', (data) => {
            console.log("--------------------------------------------------------------------------------")
            console.log(`Python stdout: ${data}`);
            console.log("--------------------------------------------------------------------------------")

            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python stderr: ${data}`);
            reject(data);
        });

    
        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
            try {
                console.log("inside closing the python process")
                resolve(result); // Resolve with the JSON data
            } catch (error) {
                reject(error);
            }
        });
    });
} 

app.post('/tags', async (req, res) => {
    try {
        const result = await retrieveByTags(req.body["tags"]);
        const cleanResult = result.replace(/[\r\n]/g, ''); // Remove line breaks and carriage returns
        const endIndex = cleanResult.indexOf(']}]') + 3; // Find the index of the first occurrence of ']}]' and include it in the result
        const finalResult = cleanResult.substring(0, endIndex); // Extract the portion of the result up to ']}]'
        return res.json({ finalResult }); // Return the result as response
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});



/* GET IMAGES BY NAME FUNCTION AND ENDPOINT SETUP BELOW */

function retrieveByName(input) {
    return new Promise((resolve, reject) => {
        console.log("inside retrieveNames function");
        console.log("input name: " + input)
    
        const pythonProcess = spawn('python', ['../backend/retrieveByName.py', input]);
    
        let result = '';
    
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python stdout: ${data}`);
            // let messageObject = JSON.parse(data);
            // console.log(messageObject.message);
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

app.post('/name', async (req, res) => {
    try {
        const result = await retrieveByName(req.body["name"]);
        return res.json({ result });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});











/* 
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
*/