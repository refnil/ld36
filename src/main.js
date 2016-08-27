var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var worldGen = {};
var player = {};
var bullet = {};

var debug = true;
var toggleDebug;
var origin = new Phaser.Circle(0, 0, 25);

function toggleDebugFun() {
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
    game.load.script("src/player", null, function() {
        player = new Player();
        player.preload(game);
    });
    game.load.script("src/weapons", null, function(){
        bullet = new Weapon();
        bullet.preload(game);
    });
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    worldGen.generate(game);
    player.generate(game);
    bullet.create(game,player);
    toggleDebug = game.input.keyboard.addKey(Phaser.Keyboard.P);
    toggleDebug.onDown.add(toggleDebugFun);

}

function update() {
    player.update(game);
    bullet.update(game);
    worldGen.update(game);
}

function render() {
    if(debug){
        var x = 5;
        var y = 0;
        var yi = 32;

        // Camera
        game.debug.cameraInfo(game.camera, x, y += yi);
        game.debug.geom(origin,'rgba(266,0,0,1)');

        worldGen.debug(game);

    }
}
