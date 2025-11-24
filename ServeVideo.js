import express from "express";
import { MongoClient, GridFSBucket, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000 ;

// MongoDB connection
const client = new MongoClient(process.env.ConnectionURI);
await client.connect();
const db = client.db("videos");

// GridFS bucket
const bucket = new GridFSBucket(db, { bucketName: "encrypted_files" });

// Hardcoded fileId of your uploaded encrypted video
const FILE_ID = new ObjectId("69244f73ceb98e338aa0f444");

app.get("/video", (req, res) => {
  try {
    const downloadStream = bucket.openDownloadStream(FILE_ID);

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="nana_election.enc"'
    );
    res.setHeader("Accept-Ranges", "bytes"); // optional, for partial reads

    downloadStream.pipe(res);

    downloadStream.on("error", (err) => {
      console.error(err);
      res.status(404).send("File not found");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/", (req, res) => {
  console.log("here i have received request in /hellfire");
  res.send("Received your request in /hellfire"); // ✅ Must respond
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/video`);
});
