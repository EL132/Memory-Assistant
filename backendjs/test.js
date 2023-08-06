const express = require('express');
const { PythonShell } = require('python-shell');
const { spawn } = require('child_process');
const { exec } = require('child_process');

const app = express();

// Other middleware and routes...

// Function to call the Python function
function callPythonFunction() {
    return new Promise((resolve, reject) => {
        console.log("inside call py function");
    
        const pythonProcess = spawn('python', ['../backend/test.py']);
    
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

// Route to call the Python function
app.get('/callpy', async (req, res) => {
    try {
        const result = await callPythonFunction();
        return res.json({ result });
    } catch (error) {
        console.error('Error calling Python function:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/test', async (req, res) => {
    console.log("asdadsadasd")
    return res.json({ error: 'Internal serdsadasdasdasver error' });
});

// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});