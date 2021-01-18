// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 5001;
const ENV = process.env.ENV || "development";
const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// const morgan     = require('morgan');
const cookieSession = require("cookie-session");

// Store database connection + db helper functions as 'db'
const db = require("./database");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan('dev'));

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/styles", sass({
//   src: __dirname + "/styles",
//   dest: __dirname + "/public/styles",
//   debug: true,
//   outputStyle: 'expanded'
// }));
// app.use(express.static("public"));
app.use(
  cookieSession({
    keys: ["meowtivate"],
  })
);

// Separated Routes for each Resource
const indexRoutes = require("./routes/indexRoutes");
const exampleRoutes = require("./routes/exampleRoutes");
const collectionRoutes = require("./routes/catsCollection");

// Mount all resource routes
const indexRouter = express.Router();
app.use("/", indexRoutes(indexRouter, db)); // login + logout routes included

const exampleRouter = express.Router();
app.use("/examples", exampleRoutes(exampleRouter, db));

const collectionRouter = express.Router();
app.use("/collections", collectionRoutes(collectionRouter, db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.render("index");
// });

app.listen(PORT, () => {
  console.log(
    `Example app listening on port ${PORT}! http://localhost:${PORT}`
  );
});