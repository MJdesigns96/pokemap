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

let pokemon = [];

// import pokemon
async function fetchPokemon() {
    let count = 1,
    name,
    habitat;
    while (count <= 151) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${count}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        };
        const json = await response.json();
        name = json.name;
        habitat = json.habitat.name;
        let obj = {
            name: name,
            habitat: habitat
        };
        pokemon.push(obj);
        count++;
    }
};

fetchPokemon();

//PAGE ROUTES
app.get("/", async (request, response) => {
    // render the page
    let poke = pokemon;
    // console.log(poke);
    response.render("index", { title: "Pokemap", pokemon: poke});
  });

//set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
    });