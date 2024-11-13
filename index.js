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

let arr = [];

// import pokemon
async function fetchPokemon() {
    let reqs = [],
    name,
    habitat;
    const response = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=151");
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    };
    const json = await response.json();
    json.results.forEach(async entry => {
        await fetch(entry.url)
        .then(response => response.json())
        .then(data => {
            name = data.name;
            habitat = data.habitat.name
        });
        let obj = {
            name: name,
            habitat: habitat
        };
        reqs.push(obj);
        if (reqs.length === 151) {
            arr = reqs;
        };
    });
};

fetchPokemon();

//PAGE ROUTES
app.get("/", async (request, response) => {
    // render the page
    response.render("index");
    console.log(arr);
  });

//set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
    });