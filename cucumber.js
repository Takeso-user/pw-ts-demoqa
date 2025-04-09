module.exports = {
  default: {
    paths: ["src/features/**/*.feature"],
    require: ["src/step_definitions/**/*.ts", "src/support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["@cucumber/pretty-formatter"],
    parallel: 2,
    tags: "not @wip",
  },
};
