import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

export default {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "node",
};
