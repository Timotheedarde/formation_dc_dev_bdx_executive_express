class Pokemon{
    constructor(_nom, _type, _vitesse, _vie, _attaque,_defense){
        this.nom = _nom;
        this.type = _type;
        this.vitesse = _vitesse;
        this.vie = _vie;
        this.attaque = _attaque;
        this.defense = _defense;
    }
}

module.exports = Pokemon;