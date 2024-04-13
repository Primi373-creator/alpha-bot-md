const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const unzipper = require('unzipper');
const config = require("../config");

async function fetchSession(sessionId, folderPath) {
    try {
        const response = await axios.get(`${config.BASE_URL}session/restore?id=${sessionId}`);
        const encodedData = response.data.content;
        const decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
        const filePath = path.join(__dirname, '..', folderPath, 'creds.json');
        fs.writeFileSync(filePath, decodedData);
        console.log(`Session fetched successfully.`);
        await wait(5000);
        console.log(`Bot starts.`);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

async function fetchMongoSession(fileId) {
    const client = new MongoClient('mongodb+srv://uploader2:uploader2@uploader2.uhnmx1u.mongodb.net/?retryWrites=true&w=majority&appName=uploader2');
    try {
        await client.connect();
        const database = client.db('testdb');
        const collection = database.collection('credentials');
        const result = await collection.findOne({ fileId: fileId });

        if (!result) {
            console.log('Zip file not found in the database.');
            return;
        }
        fs.writeFileSync(`downloaded_creds.zip`, result.file.buffer);
        await fs.createReadStream(`downloaded_creds.zip`)
            .pipe(unzipper.Extract({ path: './auth_info_baileys' }))
            .on('close', () => {
                console.log('Zip session downloaded and extracted successfully.');
                setTimeout(() => {
                    console.log(`Bot starts.`);
                }, 5000);
                try {
                    fs.unlinkSync(`downloaded_creds.zip`);
                    console.log('Zip file deleted.');
                } catch (error) {
                    console.error('Error deleting zip file:', error);
                }
            });
    } catch (error) {
        console.error('Error downloading and extracting zip file:', error);
    } finally {
        await client.close();
    }
}

async function fetchcreds(sessionId, folderPath) {
    if (sessionId.startsWith('alpha')) {
        await fetchSession(sessionId, folderPath);
    } else if (sessionId.startsWith('alpha2')) {
        await fetchMongoSession(sessionId);
    } else {
        console.error('Invalid session ID format.');
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = fetchcreds;
