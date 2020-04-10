
const express = require('express');
const app = express();
let GetPokemon = require('./modeles/GetPokemon.js');
let GetTypePokemon = require('./modeles/GetTypePokemon.js');
let Combat = require('./modeles/Combat.js');

let connect = require("./connection.js");
let config = require("./config.js");

let mustacheExpress = require('mustache-express');

app.engine("html", mustacheExpress())

  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));


app.get('/', async function (req, res) {
  let pokemon1 = req.query.pokemonName1;
  let pokemon2 = req.query.pokemonName2;

  let Joueur1 = await GetPokemon(pokemon1);
  let Joueur2 = await GetPokemon(pokemon2);
  let combat = new Combat(Joueur1, Joueur2);
  let vainqueur = combat.FightPokemon();
  console.log(vainqueur.nom, "est vainqueur");
  res.send('Le vainqueur est : ' + vainqueur.nom);
})

app.get('/pokemonInfo', async (req, res) => {
  let monPokemon = req.query.pokemonName;
  let pokemonObject = await GetPokemon(monPokemon);
  let PokemonTypeRelations = await GetTypePokemon(pokemonObject.type);
  console.log(PokemonTypeRelations);
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

