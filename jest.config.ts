// require("dotenv").config({ path: ".env.test" });
import { register } from "ts-node";

register();

import { Config } from "@jest/types";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};

export default config;
