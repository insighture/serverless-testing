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

const callEventBridgeHandler = () => {
  console.log("calling event-bridge handler");
  return async (req, res) => {
    try {
      const m = await import("../event-bridge/handler.js");
      const result = await m.handler(req);
      res.send(result); // Send the response back to the client
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };
};

const callGenericHandler = () => {
  console.log("calling generic");
  return async (req, res) => {
    try {
      const m = await import("../handler.js");
      const result = await m.handler(req);
      res.send(result); // Send the response back to the client
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  };
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/trigger/s3-client", callS3ClientHandler());
app.get("/trigger/event-bridge", callEventBridgeHandler());
app.post("/trigger/generic", callGenericHandler());

export default app;
