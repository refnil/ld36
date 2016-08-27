var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var worldGen = {}

var debug = true;
var toggleDebug;

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
    toggleDebug = game.input.keyboard.addKey(Phaser.Keyboard.P);
}

function update() {
    if(toggleDebug.isDown) {
        if(debug)
        {
            game.debug.reset();
        }
        debug = !debug;
    }
}

var origin = new Phaser.Circle(0, 0, 25);
function render() {
    if(debug){
        var x = 5;
        var y = 0;
        var yi = 32;

        // Camera
        game.debug.cameraInfo(game.camera, x, y += yi);
        game.debug.geom(origin,'rgba(266,0,0,1)');

    }
}
