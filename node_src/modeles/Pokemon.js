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
}

module.exports = Pokemon;