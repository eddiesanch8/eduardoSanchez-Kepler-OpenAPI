const path = require("path");

module.exports = {
  entry: "./js/index.js", // Path to your main JavaScript file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  mode: "development", // Use 'production' for production builds
};
