function Main(){
    this.game = {};

    this.worldGen = {};
    this.player = {};
    this.playerWeapon = {};
    this.panel = {};

    this.debug = false;

    //"Private" member
    this._origin = new Phaser.Circle(0, 0, 25);
}

Main.prototype.start = function () {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', this);
};

Main.prototype.preload = function () {
    this.loadScript("WorldGenerator", "src/world.js");
    this.loadScript("Player", "src/player.js");
    this.loadScript("Weapon", "src/weapons.js");
    this.loadScript("Panel", "src/panel.js");
};

Main.prototype.loadScript = function(className, path) {
    this.game.load.script(path, path, function() {
        var fn = window[className];
        if(typeof fn === 'function'){
            fn.preload(this.game);
        }
        else {
            console.error("Problem with class: " + className);
        }
    });
};

Main.prototype.create = function() {
    this.player = new Player();
    this.worldGen = new WorldGenerator(this);
    this.playerWeapon = new Weapon(this);
    this.panel = new Panel(this);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.worldGen.generate();
    this.player.generate(this.game);
    this.playerWeapon.create();
    this.panel.generate();
    this.game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(Main.prototype.toggleDebug,this);
};

Main.prototype.update = function () {
    this.player.update();
    this.playerWeapon.update();
    this.worldGen.update();

    //Collision
    this.game.physics.arcade.collide(this.player.sprite, this.worldGen.terrainGroup);
};

Main.prototype.render = function() {
    if(this.debug){
        var x = 5;
        var y = 0;
        var yi = 32;

        // Camera
        this.game.debug.cameraInfo(this.game.camera, x, y += yi);
        this.game.debug.geom(this._origin,'rgba(266,0,0,1)');

        this.worldGen.debug();

    }
};

Main.prototype.toggleDebug = function() {
    if(this.debug)
    {
        this.game.debug.reset();
    }
    this.debug = !this.debug;
};;

(new Main().start())
