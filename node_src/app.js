
const express = require('express')
const axios = require('axios')
const app = express()
let GetPokemon = require('./modeles/Getpokemon.js')

let connect = require("./connection.js")
let config = require("./config.js")

let mustacheExpress = require('mustache-express')

app.engine("html", mustacheExpress())

  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  let pokemon1 = req.query.pokemonName1;
  let pokemon2 = req.query.pokemonName2;

  
  let promise1 = GetPokemon(pokemon1);
  let promise2 = GetPokemon(pokemon2);


  Promise.all([promise1, promise2]).then((results)=>{
    console.log(results);
  })

  //voir awaitasynx!!

})

app.get('/calendrier', function (req, res) {
  let date = new Date();

  //console.log("DATE",date);
  console.log("params", req.query);
  res.send('Bonjour '+ req.query.prenom +' nous sommes le ' + date + ', en plein confinement!')
})

app.get('/pokemonInfo', function (req, res) {
  // declare la variable qui contient le nom de pokemon passé en parametre de requete
  let pokemon = req.query.pokemonName1;
  let pokemon2 = req.query.pokemonName2;

  // methode appel axios
  axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon)
    .then((response) =>{
      // handle success
      //console.log(response.data);
      let infoPokemon = response.data;
      //res.json(infoPokemon);
      return infoPokemon;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    // recuperer HP
    .then((infoPokemon)=>{
      let pokemonName = infoPokemon.name;
      let pokemonHP = infoPokemon.stats[5].base_stat
      let pokemonATK = infoPokemon.stats[4].base_stat
      //res.json(pokemonHP);
      pokemonStat1 = [pokemonName, pokemonHP, pokemonATK]; 
      console.log('Pokemon n°1 : ' + pokemonStat1);
      return pokemonStat1;
    })
    .then(axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon2)
      .then((response) => {
        // handle success
        //console.log(response.data);
        let infoPokemon = response.data;
        //res.json(infoPokemon);
        return infoPokemon;
      })
      .then((infoPokemon) => {
        let pokemonName = infoPokemon.name;
        let pokemonHP = infoPokemon.stats[5].base_stat
        let pokemonATK = infoPokemon.stats[4].base_stat
        //res.json(pokemonHP);
        pokemonStat2 = [pokemonName, pokemonHP, pokemonATK];
        console.log('Pokemon n°2 : ' + pokemonStat2);
        return pokemonStat2;
      })
    )
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

