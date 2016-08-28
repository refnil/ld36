function Main(){
    this.game = {};

    this.worldGen = {};
    this.player = {};
    this.playerWeapon = {};
    this.enemiesGroup = {};
    this.spawners = [];
    this.panel = {};
    this.itemGroup = {};

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
    this.loadScript("Spawner", "src/Enemy/spawner.js");
    this.loadScript("EnemyFactory", "src/Enemy/enemyfactory.js");
    this.loadScript("Enemy", "src/Enemy/enemy.js");
    this.loadScript("Lifebar", "src/lifebar.js");
    this.loadScript("Panel", "src/panel.js");
    this.loadScript("Item", "src/item.js");
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

    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    this.enemiesGroup = this.game.add.group();
    this.enemiesGroup.enableBody = true;
    this.enemiesGroup.physicsBodyType = Phaser.Physics.ARCADE;

    this.worldGen = new WorldGenerator(this);
    this.worldGen.generate();

    this.player = new Player();
    this.player.generate(this.game);

    this.playerWeapon = new Weapon(this);
    this.playerWeapon.create();

    this.panel = new Panel(this);
    this.panel.generate();

    this.itemGroup = this.game.add.group();
    this.itemGroup.enableBody = true;
    this.itemGroup.physicsBodyType = Phaser.Physics.ARCADE;

    this.spawners = this.worldGen.spawners;
    this.game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(Main.prototype.toggleDebug,this);
};

Main.prototype.update = function () {
    this.player.update();
    this.playerWeapon.update();
    this.worldGen.update();

    this.spawners.forEach(function(s) {s.update();});
    this.enemiesGroup.forEach(function(e) {e.enemy.update();});

    //Collision
    this.game.physics.arcade.collide(this.player.sprite, this.worldGen.terrainGroup);
    this.game.physics.arcade.collide(this.enemiesGroup, this.worldGen.terrainGroup);
    this.game.physics.arcade.collide(this.playerWeapon.weapon.bullets, this.enemiesGroup, Weapon.bulletHitEnemy);
    this.game.physics.arcade.collide(this.playerWeapon.weapon.bullets, this.worldGen.terrainGroup, Weapon.bulletHitKill);

    this.game.physics.arcade.overlap(this.player.sprite,this.itemGroup,collectItem);

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
        this.player.debug(this.game);

        this.enemiesGroup.forEach(function(e) {this.game.debug.body(e,false);}, this);
        this.playerWeapon.weapon.bullets.forEach(function(e) {this.game.debug.body(e, 'red', false);}, this);
    }

    this.enemiesGroup.forEach(function(e) { e.enemy.render(); });
};

Main.prototype.getCameraRectangle = function() {
    var cam = this.game.camera.view.clone();
    cam.right -= 200;
    return cam;
}

Main.prototype.toggleDebug = function() {
    if(this.debug)
    {
        this.game.debug.reset();
    }
    this.debug = !this.debug;
};

var root = new Main();
root.start();
