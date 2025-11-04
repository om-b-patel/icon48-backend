const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  roots: ["<rootDir>/src", "<rootDir>/tests"], // ✅ include your /tests folder
  testMatch: ["**/?(*.)+(test).[tj]s?(x)"],   // ✅ match .test.ts files anywhere
  verbose: true,
  detectOpenHandles: true,
};
