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