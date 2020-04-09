const axios = require('axios');

let GetTypePokemon = (pokemonType)=>{
    return axios.get(pokemonType)
        .then((response) => {
            // handle success
            //console.log(response.data);
            let infoTypePokemon = response.data.damage_relations;
            //console.log(infoTypePokemon);
            return infoTypePokemon;
        })
        .catch((error) => {
            // handle error
            console.log(error);
        })
}

module.exports = GetTypePokemon;