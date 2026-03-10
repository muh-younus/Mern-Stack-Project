const ImageKit = require("imagekit")

const client = new ImageKit({
  privateKey: process.env.PRIVATE_KEY, // This is the default and can be omitted
  publicKey: process.env.PUBLIC_KEY,
  urlEndpoint:'https://ik.imagekit.io/1dffjiqpc'
});


async function uploadImage(buffer){
console.log("the bufferis ",buffer)

const result = await client.upload({
  file: buffer.toString('base64'),
  fileName: 'image.jpg',
});

return result
}

module.exports = uploadImage

