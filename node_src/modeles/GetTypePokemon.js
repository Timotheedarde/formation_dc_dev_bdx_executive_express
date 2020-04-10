const axios = require('axios');
let PokemonTypeRelations = require('./PokemonTypeRelations.js');


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
        .then((infoTypePokemon)=>{
            let doubleDamageFrom = infoTypePokemon.double_damage_from.map(function (elem) {
                return elem.name;
            });
            let doubleDamageTo = infoTypePokemon.double_damage_to.map(function (elem) {
                return elem.name;
            });
            let halfDamageFrom = infoTypePokemon.half_damage_from.map(function (elem) {
                return elem.name;
            });
            let halfDamageTo = infoTypePokemon.half_damage_to.map(function (elem) {
                return elem.name;
            });
            let noDamageFrom = infoTypePokemon.no_damage_from.map(function (elem) {
                return elem.name;
            });
            let noDamageTo = infoTypePokemon.no_damage_to.map(function (elem) {
                return elem.name;
            });
            return typeInfo = new PokemonTypeRelations(doubleDamageFrom, doubleDamageTo, halfDamageFrom, halfDamageTo, noDamageFrom, noDamageTo);
        })
}

module.exports = GetTypePokemon;