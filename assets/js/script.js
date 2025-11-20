// === VARIABLES
let oCanvasHTML = document.querySelector("canvas");
let oContexte = oCanvasHTML.getContext("2d");

let nHauteurCanvas = oCanvasHTML.height;
let nLargeurCanvas = oCanvasHTML.width;

//let fondX = 0;
//let fondY = 0;
//let vitesse = 2;
//let imageFond = new Image();
//let imageFondSrc = "assets/images/bg2.png";

let oFond ={
    x:0, 
    y:0,
    hauteur: oCanvasHTML.height,
    largeur: oCanvasHTML.width,
    vitesse: 2,
    image: new Image(),
    fondSrc: "assets/images/bg1.png",
    srcBlesse: "assets/images/vaisseau_blesse.png",
}

let oVaisseau = {
    x: nLargeurCanvas / 2 - 96 / 2,
    y: nHauteurCanvas - 128,
    largeur: 96,
    hauteur: 128,
    vitesse: 10,
    vie: 5,
    points: 0,
    estBlesse: false,
    image: new Image(),
    src: "assets/images/vaisseau.png",
    srcBlesse: "assets/images/vaisseau_blesse.png",
};


let oMissile = {
    x: 0,
    y: 0,





}

// let oMeteorite = {
//     x: nLargeurCanvas / 2 - 96 / 2,
//     y: -262,
//     largeur: 150,
//     hauteur: 131,
//     vitesse: 10,
//     angle: 0,
//     image: new Image(),
//     src: "assets/images/meteorite.png",
// };
let sEtat = "jeu";
let sTouche;

// ==== Musique
let oMusique = {
    son: new Audio("assets/audio/trameMusicale1.mp3"),
};

let oSFX = {
    son: new Audio("assets/audio/explosion.flac"),
    explosion: "assets/audio/explosion.flac",
    missile: "assets/audio/missile.wav",
    collision: "assets/audio/fin.wav",
};

function initialiser() {
    setInterval(boucleJeu, 1000 / 60);
    window.addEventListener("click", onClicCanvas);
    window.addEventListener("keydown", onTouchEnFoncee);
    window.addEventListener("keyup", onTouchRelache);
}

//==== FONCTIONS D'ÉCOUTEUR D'ÉVÉNEMENTS
function onClicCanvas(evenement) {
    if (sEtat == "jeu") {
        //Lancer un projectile
    } else if (sEtat == "fin") {
        sEtat = "jeu";
    }
}

//TODO: gérer les touches du claviers
function onTouchEnFoncee(evenement) 
{sTouche = evenement.key;
    console.log(sTouche);
    if (sTouche == "" && oMissile.estVisible == false){
        oMissile.x = oVaisseau.x;
        oMissile.y = oVaisseau.y;
    }
}


function onTouchRelache(evenement) 
{sTouche = null;}



// === Boucle jeu
function boucleJeu() {
    oContexte.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);

    if (sEtat == "jeu") {
        dessinerDessinerBase();
        dessinerVaisseau();
    } else if (sEtat == "fin") {
        afficherFin();
    }
}

function dessinerDessinerBase() {
    oFond.image.src = oFond.fondSrc;
    oFond.y += oFond.vitesse;
    if (oFond.y > nHauteurCanvas) {
        oFond.y = 0;
    }
    oContexte.drawImage(oFond.image, oFond.x, oFond.y, nLargeurCanvas, nHauteurCanvas);
    oContexte.drawImage(oFond.image, oFond.x, oFond.y - nHauteurCanvas, nLargeurCanvas, nHauteurCanvas);
}


function dessinerMissile(){
    if (oMissile.estVisible == true)
    {oMissile.y -= oMissile.vitesse;
        oMissile.image.src = oMissile.srcMissile
        oContexte.drawImage (oMissile.image, oMissile.x, oMissile.y, oMissile.largeur, oMissile.hauteur); 
    }

    let collision = detecterCollision(oMissile, oMeteorite);
    if (collision == true && oMissile){}


}
function dessinerMeteorite() {
    oMeteorite.image.src = oMeteorite.src;
    oMeteorite.y += oMeteorite.vitesse;
    oMeteorite.angle += 0.05;

    if (oMeteorite.y > nHauteurCanvas) {
        oMeteorite.y = -2000;

        setTimeout(function () {
            oMeteorite.y = 0 - oMeteorite.hauteur;
            oMeteorite.x = Math.random() * (nLargeurCanvas - oMeteorite.largeur);
        }, Math.random() * 1000 + 500);
    }

    oContexte.drawImage(oMeteorite.image, oMeteorite.x, oMeteorite.y, oMeteorite.largeur, oMeteorite.hauteur);
}

function dessinerVaisseau() {
    //TODO: Déplacer le vaisseau avec les touches

if (sTouche == "ArrowRight")
       {oVaisseau.x = oVaisseau.x - oVaisseau.vitesse;
        if (oVaisseau.x > nLargeurCanvas - oVaisseau.largeur)
            {oVaisseau.x = nLargeurCanvas - oVaisseau.largeur;}
       }

    if (sTouche == "ArrowLeft")
       {oVaisseau.x = oVaisseau.x - oVaisseau.vitesse;
       if(oVaisseau.x < 0) {oVaisseau.x = 0;}


    if (sTouche == "ArrowUp")
       {oVaisseau.y -= oVaisseau.y.vitesse;
        if(oVaisseau.y < 0){}
       }

    if (sTouche == "ArrowDown")
       {oVaisseau.y += oVaisseau.vitesse;
    if(oVaisseau.y > nHauteurCanvas + oVaisseau.hauteur)
       {oVaisseau.y = nHauteurCanvas + oVaisseau.hauteur;}
       } 
    }}

    if (oVaisseau.estBlesse) {
        oVaisseau.image.src = oVaisseau.srcBlesse;
    } else {
        oVaisseau.image.src = oVaisseau.src;
    }

    oContexte.drawImage(oVaisseau.image, oVaisseau.x, oVaisseau.y, oVaisseau.largeur, oVaisseau.hauteur);

function dessinerUI() {
    oContexte.font = "15px Nasalization";
    oContexte.textAlign = "left";
    oContexte.fillStyle = "white";
    oContexte.fillText(`Vies: ${oVaisseau.vie}`, 15, 30);

    oContexte.font = "15px Nasalization";
    oContexte.textAlign = "right";
    oContexte.fillStyle = "white";
    oContexte.fillText(`Points: ${oVaisseau.points}`, nLargeurCanvas - 15, 30);
}

function afficherFin() {
    oFond.vitesse = 0.5;
    dessinerDessinerBase();

    oContexte.font = "30px Nasalization";
    oContexte.textAlign = "center";
    oContexte.fillStyle = "white";
    oContexte.fillText(`Vous avez perdu`, nLargeurCanvas / 2, nHauteurCanvas / 2);
    oContexte.fillText(`Pointage: ${oVaisseau.points}`, nLargeurCanvas / 2, nHauteurCanvas / 2 + 60);
}

//// FONCTIONS DE DÉTECTION DE COLLISION avec objets
function detecterCollision(objet1, objet2) {
    if (objet1.x < objet2.x + objet2.largeur && objet1.x + objet1.largeur > objet2.x && objet1.y < objet2.y + objet2.hauteur && objet1.y + objet1.hauteur > objet2.y) {
        return true;
    } else {
        return false;
    }
}

window.addEventListener("load", initialiser);
