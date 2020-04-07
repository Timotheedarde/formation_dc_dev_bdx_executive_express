const axios = require('axios');


let GetPokemon = (pokemonName)=>{
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
        .then((response) => {
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
        .then((infoPokemon) => {
            let pokemonName = infoPokemon.name;
            let pokemonHP = infoPokemon.stats[5].base_stat
            let pokemonATK = infoPokemon.stats[4].base_stat
            //res.json(pokemonHP);
            pokemonStat1 = [pokemonName, pokemonHP, pokemonATK];
            console.log('Pokemon n°1 : ' + pokemonStat1);
            return pokemonStat1;
        })
}

module.exports = GetPokemon;