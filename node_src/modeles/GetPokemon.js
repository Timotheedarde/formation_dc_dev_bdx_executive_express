const axios = require('axios');


let GetPokemon = (pokemonName)=>{
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
        .then((response) => {
            // handle success
            //console.log(response.data);
            let infoPokemon = response.data;
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
            pokemonStat = [pokemonName, pokemonHP, pokemonATK];
            //console.log(pokemonStat);
            return pokemonStat;
        })
}

module.exports = GetPokemon;