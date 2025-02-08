const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // For file system operations
const path = require('path');

const app = express();
const port = 3000; // Or any other port you prefer

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies

const dataFilePath = path.join(__dirname, 'data.json'); // Path to your data file

// Function to read data from the JSON file
const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data:", err);
        return { gameHistory: [] }; // Return default object if file doesn't exist or is invalid
    }
};

// Function to write data to the JSON file
const writeData = (data) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing data:", err);
    }
};

// GET route to retrieve game history
app.get('/api/gameHistory', (req, res) => {
    const data = readData();
    res.json(data.gameHistory);
});

// POST route to add a new game to the history
app.post('/api/gameHistory', (req, res) => {
    const newGame = req.body;
    const data = readData();
    data.gameHistory.push(newGame);
    writeData(data);
    res.status(201).json(newGame); // Respond with the new game and a 201 Created status
});

// DELETE route to clear game history
app.delete('/api/gameHistory', (req, res) => {
    const data = { gameHistory: [] }; // Reset the game history
    writeData(data);
    res.status(204).send(); // Respond with a 204 No Content status
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


/*
**Explanation of the code:**

*   **`require()`:**  Imports the necessary modules (`express`, `cors`, `body-parser`, `fs`, and `path`).
*   **`app = express()`:** Creates an Express application.
*   **`app.use()`:**  Adds middleware to the application.
    *   `cors()`:  Enables CORS.
    *   `bodyParser.json()`:  Parses JSON request bodies.
*   **`dataFilePath`**: Defines the path to the `data.json` file where you will save the data.
*   **`readData()` Function:** Reads the data from the JSON file. If the file does not exists, returns the default `gameHistory` object
*   **`writeData()` Function:** Writes the data to the JSON file.
*   **`app.get('/api/gameHistory', ...)`:** Defines a GET route to retrieve the game history.  It reads the data from `data.json` and sends it as a JSON response.
*   **`app.post('/api/gameHistory', ...)`:** Defines a POST route to add a new game to the history.  It reads the existing data, adds the new game, writes the updated data to `data.json`, and sends a response.
*   **`app.delete('/api/gameHistory', ...)`:** Defines a DELETE route to clear the game history. It resets `data.json`, and sends a response.
*   **`app.listen(port, ...)`:** Starts the server and listens for incoming requests on the specified port.
*/