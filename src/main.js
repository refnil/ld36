var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var worldGen = {};

function preload() {
    game.load.script("src/world", null, function() {
        worldGen = new WorldGenerator();
        worldGen.preload(game);
    });
    game.load.image('player','assets/medieval-rts/PNG/Retina/Unit/medievalUnit_02.png')
}

function create() {
    worldGen.generate(game);
    player.player(game);
}

function update() {
}
