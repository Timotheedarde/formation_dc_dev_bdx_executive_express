const axios = require('axios');
let Pokemon = require('./Pokemon.js')
let GetTypePokemon = require('./GetTypePokemon.js');


let GetPokemon = (pokemonName)=>{
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
        .then((response) => {
            // handle success
            let infoPokemon = response.data;
            return infoPokemon;
        })
        .catch((error) => {
            // handle error
            console.log(error);
        })
        // recuperer HP
        .then(async (infoPokemon) => {
            let pokemonName = infoPokemon.name;
            let pokemonTypeURL = infoPokemon.types[0].type.url;
            let pokemonTypeName = infoPokemon.types[0].type.name;
            let pokemonVIT = infoPokemon.stats[0].base_stat;
            let pokemonHP = infoPokemon.stats[5].base_stat;
            let pokemonATK = infoPokemon.stats[4].base_stat;
            let pokemonDEF = infoPokemon.stats[3].base_stat;
            let PokemonTypeRelations = await GetTypePokemon(pokemonTypeURL);
            return new Pokemon(pokemonName, pokemonTypeURL, pokemonTypeName, PokemonTypeRelations, pokemonVIT, pokemonHP, pokemonATK, pokemonDEF);
        })
}

module.exports = GetPokemon;