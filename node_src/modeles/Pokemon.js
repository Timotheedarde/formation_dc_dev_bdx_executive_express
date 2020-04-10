const axios = require('axios');
let PokemonTypeRelations = require('./PokemonTypeRelations.js');

class Pokemon{
    constructor(_nom, _typeURL, _typeName, _typeRelations, _vitesse, _vie, _attaque,_defense){
        this.nom = _nom;
        this.typeURL = _typeURL;
        this.typeName = _typeName;
        this.typeRelations = _typeRelations;
        this.vitesse = _vitesse;
        this.vie = _vie;
        this.attaque = _attaque;
        this.defense = _defense;
    }

    static getPokemon(pokemonName)
    {
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
                let PokemonTypeRelations = await Pokemon.getTypePokemon(pokemonTypeURL); // GetTypePokemon renvoi un objet avec les relations entre types
                return new Pokemon(pokemonName, pokemonTypeURL, pokemonTypeName, PokemonTypeRelations, pokemonVIT, pokemonHP, pokemonATK, pokemonDEF);
            })
    }

    static getTypePokemon(pokemonType)
    {
        let typeInfo;
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
            .then((infoTypePokemon) => {
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
}

module.exports = Pokemon;