const ImageKit = require('@imagekit/nodejs');
const { clientEncryption } = require('../model/music.model');

console.log("the private key",process.env.PRIVATE_KEY);

const client = new ImageKit({
    privateKey: 'private_b2PprkmmC4dZwGBRAc0I8VTpk88=',
    publicKey: process.env.PUBLIC_KEY,
    urlEndpoint: process.env.URL
});

async function uploadFile(file){
    const result = await client.files.upload({
        file: file, // must pass file property
        fileName: "music" + Date.now(), // correct spelling
        folder: "spotify/music"
    });

    return result;
}

module.exports = { uploadFile };