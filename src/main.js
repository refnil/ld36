var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var worldGen = {}

var debug = true;
var toggleDebug;

function toggleDebugFun()
{
    if(debug)
    {
        game.debug.reset();
    }
    debug = !debug;
}

function preload() {
    game.load.script("src/world", null, function() {
        worldGen = new WorldGenerator();
        worldGen.preload(game);
    });
}

function create() {
    worldGen.generate(game);
    toggleDebug = game.input.keyboard.addKey(Phaser.Keyboard.P);
    toggleDebug.onDown.add(toggleDebugFun);
}

function update() {
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
