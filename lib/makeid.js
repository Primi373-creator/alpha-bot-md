const fs = require("fs").promises;
const axios = require("axios")
const path = require("path")

async function MakeId(sessionId, folderPath, mongoDb) {
    try {
        await fs.mkdir(folderPath, {
            recursive: true
        });
        const response = await axios.post('https://api.lokiser.xyz/mongoose/session/restore', {
            id: sessionId,
            mongoUrl: mongoDb
        });
        const jsonData = response.data.data;
        const filePath = path.join(folderPath, "creds.json");
        await fs.writeFile(filePath, jsonData);
        
        console.log("creds.json created successfully.");
    } catch (error) {
        console.error("An error occurred:", error.message);
        throw error;
    }
}

module.exports = MakeId