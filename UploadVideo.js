import { MongoClient, GridFSBucket } from "mongodb";
import fs from "fs";

async function uploadEncryptedFile() {
  const client = new MongoClient(
    "mongodb+srv://wasif:wasif9900@cluster0.pcytu.mongodb.net/Sajids_Proj"
  );
  await client.connect();

  const db = client.db("videos");
  const bucket = new GridFSBucket(db, { bucketName: "encrypted_files" });

  const uploadStream = bucket.openUploadStream("nana_election.enc");
  const fileStream = fs.createReadStream("./nana_election.enc");

  fileStream.pipe(uploadStream);

  uploadStream.on("finish", () => {
    console.log("Upload complete. File ID:", uploadStream.id);
    client.close();
  });
}

uploadEncryptedFile();
