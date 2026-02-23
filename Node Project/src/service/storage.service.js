const ImageKit = require("imagekit")

const client = new ImageKit({
  privateKey:'private_b2PprkmmC4dZwGBRAc0I8VTpk88=', // This is the default and can be omitted
  publicKey: 'public_t7VbWs0QpCQEZZORUjYZYdYJ+xk=',
  urlEndpoint:'https://ik.imagekit.io/1dffjiqpc'
});


async function uploadImage(buffer){
console.log("the bufferis ",buffer)

const result = await client.files.upload({
  file: buffer.toString('base64'),
  fileName: 'image.jpg',
});

return result
}

module.exports = uploadImage

