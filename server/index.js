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
      res.status(500).send("Internal Server Error");
    }
  };
};

app.get("/trigger/s3-client", callS3ClientHandler());

export default app;
