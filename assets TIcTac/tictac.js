var config = {
    type: Phaser.AUTO, //Welche Grafikvariante
    width: 800,
    height: 600,
    physics: { //Welche Physics-Engine wird eingesetzt
        default: 'arcade', //Arcade, Impact oder Matter
        arcade: {
            gravity: {
                y: 200
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var scene = null;

var spieler1 = 'kreuz';
var spieler2 = 'kreis';

var amSpielzug = spieler1;

var spielzug = 9;

var spielKacheln = [
    [],
    [],
    []
];

// Bilder Hochladen

function preload() {

    this.load.image('spielfeld', './Assets/PNG/spielfeld.png');
    this.load.image('kreuz', './Assets/PNG/kreuzGrau.png');
    this.load.image('kreis', './Assets/PNG/kreisGrau.png');
    this.load.image('leer', './Assets/PNG/leer.png');


}


// Die Spielwelt erstellt

function create() {
    if (scene === null) {
        scene = this;
    }

    // 'spielfeld' ist eine png Datei, hier wird die ins Leben gerufen. 400, 300 sind die Größen
    spielfeld = scene.add.image(400, 300, 'spielfeld');
    spielfeld.setScale(0.5);

    text = scene.add.text(325, 10, `Start your Game`);
    // var player1 = scene.add.text(10, 20, `player 1`);
    // var player2 = scene.add.text(10, 40, `player 2`);

    // Obere Reihe
    kachelErstellen(250, 150);
    kachelErstellen(395, 150);
    kachelErstellen(540, 150);

    // Mittlere Reihe
    kachelErstellen(250, 290);
    kachelErstellen(395, 290);
    kachelErstellen(540, 290);

    // Untere Reihe
    kachelErstellen(250, 435);
    kachelErstellen(395, 435);
    kachelErstellen(540, 435);
}

// Leeres Bild Kachel, wird entweder X oder O ersetzt
function kachelErstellen(x, y) {
    var kachel = scene.add.image(x, y, 'leer').setInteractive();
    kachel.setScale(0.1);

    // Wenn Kachel besetzt ist, kann in dem Kachel keine aktion mehr passieren
    kachel.on('pointerup', function() {
        if (kachel.besetzt) {
            return;
        }
        var besetzt = scene.add.image(x, y, amSpielzug); // Fügt das jeweilige Bild X oder O ein

        besetzt.setScale(0.450);
        spielzug--; // die Kacheln werden gezählt
        kachel.besetzt = true; // spielKachel setzen

        nächsterZug();
    });
}

function nächsterZug() {
    // gewinner prüfen muss noch erstellt werden

    if (spielzug == 0) { // wenn es 0 Züge verbleiben
        text.setText('Das Spiel ist vorbei!'); // setze das Text ein...
        return;
    }

    if (amSpielzug == spieler1) { //wenn am Zug sp1 = kreuz, dann am Zug
        amSpielzug = spieler2; // sp2
        text.setText('Spieler X ist dran!'); // + dazugehöriger aufforderungs Text
    } else if (amSpielzug == spieler2) { // sonst wenn, am Zug sp2 => am Zug sp1 + der Text
        amSpielzug = spieler1;
        text.setText('Spieler O ist dran!');

    }
}

function update() {

}