import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** @type {import('@jest/types').Config.InitialOptions} */
export default {
  preset: "ts-jest/presets/default-esm", // ts-jest ESM preset
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {},
  // transform: {
  //   "^.+\\.tsx?$": ["ts-jest", { useESM: true, tsconfig: "tsconfig.json" }],
  // },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  transformIgnorePatterns: ["/node_modules/(?!supertest)"], // transform supertest
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // fix ESM imports of local files
  },
};
