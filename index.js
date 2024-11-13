//import required modules
const express = require("express");
const path = require("path");

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //need for parsing JSON data from requests

//PAGE ROUTES
app.get("/", async (request, response) => {
    // render the page
    response.render("index" );
  });

//set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
    });