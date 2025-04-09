module.exports = {
  default: {
    paths: ["src/features/**/*.feature"],
    require: ["src/step_definitions/**/*.ts", "src/support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "@cucumber/pretty-formatter",
      ["./node_modules/allure-cucumberjs/dist/cjs/reporter.js"]
    ],
    parallel: 2,
    tags: "not @wip",
    formatOptions: {
      "allure-cucumberjs": {
        resultsDir: "./allure-results"
      }
    }
  },
};
