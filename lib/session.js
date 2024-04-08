const fs = require('fs');
const { MongoClient } = require('mongodb');
const unzipper = require('unzipper');


async function fetchsession(fileId, databaseName) {
    const client = new MongoClient('mongodb+srv://uploader2:uploader2@uploader2.uhnmx1u.mongodb.net/?retryWrites=true&w=majority&appName=uploader2');
    try {
        await client.connect();
        const database = client.db(databaseName);
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
                console.log('Zip session downloaded and  extracted successfully.\nbot starts in 5 seconds');
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

module.exports = fetchsession;
