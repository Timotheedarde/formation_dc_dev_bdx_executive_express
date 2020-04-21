
const express = require('express');
const app = express();
let Combat = require('./modeles/Combat.js');
let Pokemon = require('./modeles/Pokemon.js');

let connect = require("./connection.js");
let config = require("./config.js");

let mustacheExpress = require('mustache-express');

app.engine("html", mustacheExpress())

  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));


app.get('/', async function (req, res) {
  let pokemon1 = req.query.pokemonName1.toLowerCase();
  let pokemon2 = req.query.pokemonName2.toLowerCase();

  let combattant1 =  Pokemon.getPokemon(pokemon1);
  let combattant2 =  Pokemon.getPokemon(pokemon2);
  let combattants = await Promise.all([combattant1,combattant2]);
  let combat = new Combat(combattants[0], combattants[1]);
  let vainqueur = combat.FightPokemon();
  console.log(vainqueur.nom, "est vainqueur");
  res.send('Le vainqueur est : ' + vainqueur.nom);
})

app.get('/pokemonInfo', async (req, res) => {
  let monPokemon = req.query.pokemonName;
  let pokemonObject = await Pokemon.getPokemon(monPokemon);
  console.log(pokemonObject);
  //console.log(pokemonObject.typeRelations.doubleDamageFrom);
  res.send(pokemonObject);
})

app.get('/calendrier', function (req, res) {
  let date = new Date();

  //console.log("DATE",date);
  console.log("params", req.query);
  res.send('Bonjour '+ req.query.prenom +' nous sommes le ' + date + ', en plein confinement!')
})

app.get("/hello", (req, res) => {
  res.render('index', {name: "Timothée"})
})


app.get('/todo', async (req, res) => {

  let {db_client, db_connection} = await connect()
  
  db_connection.collection('todo').find({}).toArray((err, result) => {
    if(err) return console.log(err)
    console.log('todo :', result)
    db_client.close()
    res.send(result)
  })
})


app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port} !`)
})

