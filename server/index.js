import express from "express";

const app = express();

const callS3ClientHandler = () => {
  console.log("calling s3 client handler");
  return async (req, res) => {
    try {
      const m = await import("../s3-client/handler.js");
      const result = await m.handler(req);
      res.send(result); // Send the response back to the client
    } catch (error) {
      console.error("Error while calling S3 client handler:", error);
      res.status(500).send("Internal Server Error");
    }
  };
};

app.get("/trigger/s3-client", callS3ClientHandler());

app.listen({ port: 3000 }, () => {
  console.log("Server is running on port 3000");
});
