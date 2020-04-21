class Combat{
    constructor(_pokemon1,_pokemon2){
        this.pokemon1 = _pokemon1;
        this.pokemon2 = _pokemon2;
    }
    
    FightPokemon(){
        console.log(this.pokemon1.nom, "va affronter", this.pokemon2.nom);

        // Determiner l'ordre des combattants
        let premier;
        let second;
        let vainqueur;
        if (this.pokemon1.vitesse > this.pokemon2.vitesse) {
            premier = this.pokemon1;
            second = this.pokemon2;
        }
        else {
            premier = this.pokemon2;
            second = this.pokemon1;
        }
        console.log(premier.nom, "attaque en premier");

        //determine les relations en fonction du type

        //console.log("type du premier",premier.typeName);
        //console.log("type du second",second.typeName);
        
        // on controle les elements du tableau de type du premier pokemon
        let doubleDamageFrom = premier.typeRelations.doubleDamageFrom;
        //console.log(doubleDamageFrom);
        let doubleDamageTo = premier.typeRelations.doubleDamageTo;
        //console.log(doubleDamageTo);
        let halfDamageFrom = premier.typeRelations.halfDamageFrom;
        //console.log(halfDamageFrom);
        let halfDamageTo = premier.typeRelations.halfDamageTo;
        //console.log(halfDamageTo);
        let noDamageFrom = premier.typeRelations.noDamageFrom;
        //console.log(noDamageFrom);
        let noDamageTo = premier.typeRelations.noDamageTo;
        //console.log(noDamageTo);

        console.log("hp de", premier.nom, "=", premier.vie);
        console.log("hp de", second.nom, "=", second.vie);

        console.log("vitesse de", premier.nom, "=", premier.vitesse);
        console.log("vitesse de", second.nom, "=", second.vitesse);

        console.log("defense de", premier.nom, "=", premier.defense);
        console.log("defense de", second.nom, "=", second.defense);

        console.log("attaque de", premier.nom, "=", premier.attaque);
        console.log("attaque de", second.nom, "=", second.attaque);


        if (doubleDamageFrom.indexOf(second.typeName)>=0)
        {
            //console.log("il y est!");
            second.attaque = second.attaque * 2;
        }
        if (doubleDamageTo.indexOf(second.typeName) >= 0)
        {
            premier.attaque = premier.attaque * 2;
        }
        if (halfDamageFrom.indexOf(second.typeName) >=0)
        {
            premier.defense = premier.defense * 2;
        }
        if (halfDamageTo.indexOf(second.typeName) >= 0) {
            second.defense = second.defense * 2;
        }
        if (noDamageFrom.indexOf(second.typeName) >= 0) {
            second.attaque = second.attaque /10;
        }
        if (noDamageTo.indexOf(second.typeName) >= 0) {
            premier.attaque = premier.attaque /10;
        }

        console.log("defense (aprés controle des types) de", premier.nom, "=", premier.defense);
        console.log("defense (aprés controle des types) de", second.nom, "=", second.defense);

        console.log("attaque (aprés controle des types) de",premier.nom,"=",premier.attaque);
        console.log("attaque (aprés controle des types) de", second.nom,"=", second.attaque);


        // Combat
        let cptr = 1; //compteur de tour
        while (premier.vie > 0 && second.vie > 0) {
            console.log('tour:', cptr);
            if (cptr % 2 != 0) {
                let degats = premier.attaque / (1 + (second.defense / 100));
                if (degats > 0) {
                    second.vie = second.vie - degats;
                    console.log(premier.nom, 'attaque à ', degats);
                    console.log(second.nom, "à", second.vie, 'HP');
                }
                if (second.vie <= 0) {
                    vainqueur = premier;
                }
            }
            else {
                let degats = second.attaque / (1 + (premier.defense / 100));
                if (degats > 0) {
                    premier.vie = premier.vie - degats;
                    console.log(second.nom, 'attaque à ', degats, 'points');
                    console.log(premier.nom, "à", premier.vie, 'HP');

                }
                if (premier.vie <= 0) {
                    vainqueur = second;
                }
            }
            cptr++;
        }

        //on renvoi le resultat du combat
        return vainqueur;
    }

}
module.exports = Combat;