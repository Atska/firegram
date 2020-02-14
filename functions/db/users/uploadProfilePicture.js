const { admin, db } = require("../../utils/admin");
const firebaseConfig = require("../../utils/firebaseConfig");
const Busboy = require("busboy");
const path = require("path");
const fs = require("fs");
const os = require("os");

const uploadProfilePicture = (request, response) => {
  // firebase automatically scales picture to 10*1024*1024
  const busboy = new Busboy({ headers: request.headers });
  // operating system's default directory for temporary files as a string.
  const tmpdir = os.tmpdir();
  let imageFileName = {};
  // This object will accumulate all the uploaded files, keyed by their name.
  let uploadedImage = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    // only image files, blocks mp3, text etc.
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return response.status(400).json({ error: "Wrong file type submitted!" });
    }
    console.log("2");
    console.log(fieldname);
    console.log(filename);
    console.log(mimetype);
    // Get the extension (jpeg, png) of any image file => image.png => png
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    // Rename the filename with a random generated number => image.png => 4535435355.png
    imageFileName = `${Math.round(
      Math.random() * 100000000000
    )}.${imageExtension}`;
    console.log(imageFileName);
    // Creating path
    const filepath = path.join(tmpdir, imageFileName);
    console.log("3");
    console.log(filepath);

    uploadedImage = { filepath, mimetype };
    console.log("4");
    console.log(uploadedImage);
    // Streams are a collection of data
    // Allows us to write data to create file => Returns a new writeable stream object
    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);
  });

  busboy.on("finish", async () => {
    try {
      await admin
        .storage()
        .bucket()
        .upload(uploadedImage.filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: uploadedImage.mimetype
            }
          }
        });

      // without ?alt=media it will download the file instead of showing it to us
      const photoURL = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
      console.log("5");
      console.log(photoURL);
      // Update our User 
      await db.doc(`/Users/${request.user.handle}`).update({ photoURL });
      return response.status(200).json({
        message: "Image was successfuly uploaded."
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error.code });
    }
  });

  busboy.end(request.rawBody);
};

module.exports = uploadProfilePicture;

// https://firebase.google.com/docs/rules/rules-language?authuser=0#storage
// https://stackoverflow.com/questions/58461076/upload-multiple-images-on-firebase-using-nodejs-and-busboy
// https://cloud.google.com/functions/docs/writing/http
