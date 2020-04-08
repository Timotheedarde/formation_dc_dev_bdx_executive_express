
let FightPokemon = (Adversaire1,Adversaire2) =>{
    console.log(Adversaire1.nom,"va affronter",Adversaire2.nom);



    // Determiner l'ordre des combattants
    let premier;
    let second;
    let vainqueur;
    if (Adversaire1.vitesse > Adversaire2.vitesse) {
        premier = Adversaire1;
        second = Adversaire2;
    }
    else {
        premier = Adversaire2;
        second = Adversaire1;
    }
    console.log(premier.nom,"attaque en premier");

    // Combat
    let cptr = 1; //compteur de tour
    while (premier.vie > 0 && second.vie > 0)
    {
        console.log('tour:', cptr);
        if(cptr % 2 != 0)
        {
            let degats = premier.attaque / (1 + (second.defense / 100));
            if(degats > 0)
            {
                second.vie = second.vie - degats;
                console.log(premier.nom, 'attaque à ', degats);
                console.log(second.nom, "à",second.vie, 'HP');
            }
            if(second.vie <= 0)
            {
                vainqueur = premier;
            }
        }
        else
        {
            let degats = second.attaque / (1 + (premier.defense / 100));
            if (degats > 0) 
            {
                premier.vie = premier.vie - degats;
                console.log(second.nom, 'attaque à ', degats, 'points');
                console.log(premier.nom, "à",premier.vie, 'HP');

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

module.exports = FightPokemon;