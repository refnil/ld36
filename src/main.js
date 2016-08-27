var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var worldGen = {};

function preload() {
    game.load.script("src/world", null, function() {
        worldGen = new WorldGenerator();
        worldGen.preload(game);
    });
}

function create() {
    worldGen.generate(game);
}

function update() {
}
