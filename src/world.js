function WorldGenerator(main, playableSize, border) {
    this.main = main;

    this.playableSize = playableSize || 1200;
    this.border = border || 128;

    this.ui = 200;
    this.terrainGroup = null;
    this.groundSprite = null;
}


WorldGenerator.prototype.generate = function() {

    this.terrainGroup = this.main.game.add.group();
    this.terrainGroup.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    var bounds = this.worldBounds();

    this.main.game.world.setBounds(bounds.x, bounds.y, bounds.width+200, bounds.height);

    this.groundSprite = this.main.game.add.tileSprite(0,0,this.main.game.camera.width,this.main.game.camera.height,WorldGenerator.ground);
    this.groundSprite.fixedToCamera = true;
    this.main.game.world.sendToBack(this.groundSprite);

    for(var i = 0; i < 10; i++)
    {
        this.addRandomObstacle();
    }

    this.makeBounds();
};

WorldGenerator.prototype.addRandomObstacle = function() {
    var world = this.main.game.world;
    var playable = this.playableRectangle();
    playable.width -= this.border;
    playable.height-= this.border;
    var randomX = playable.randomX+64;
    var randomY = playable.randomY+64;
    if(randomX*randomX + randomY *randomY >= 4900) {
        this.createTerrain(randomX-64, randomY-64);
    }
};

WorldGenerator.prototype.makeBounds = function() {
    var world = this.main.game.world;
    
    var position = [];

    var playable = this.playableRectangle();

    var xleft = playable.left - this.border;
    var xright = playable.right;
    var ybot = playable.bottom;
    var ytop = playable.top - this.border;


    //Top and bottom border
    var texture = this.main.game.add.renderTexture(playable.width, this.border);
    this.main.game.cache.addImage('emptyHor', null, texture.getImage());
    var sprite = this.terrainGroup.create(playable.left,ytop,'emptyHor');
    sprite.body.immovable = true;
    sprite = this.terrainGroup.create(playable.left, ybot, 'emptyHor');
    sprite.body.immovable = true;


    //Left and right border
    texture = this.main.game.add.renderTexture(this.border, playable.height);
    this.main.game.cache.addImage('emptyVer', null, texture.getImage());
    sprite = this.terrainGroup.create(xleft, playable.top,'emptyVer');
    sprite.body.immovable = true;
    sprite = this.terrainGroup.create(xright, playable.top , 'emptyVer');
    sprite.body.immovable = true;

    //border decoration
    var distance = 64;

    for(var x = xleft; x <= xright; x += distance)
    {
        position.push({'x': x, 'y':ybot});
        position.push({'x': x, 'y':ytop});
    }

    for(var y = ytop+distance; y <= ybot-distance; y += distance)
    {
        position.push({'x': xleft, 'y':y});
        position.push({'x': xright, 'y':y});
    }


    obstacle = WorldGenerator.obstacle;
    position.sort(function(pos1, pos2) {
        if(pos1.y < pos2.y){
            return -1;
        }
        else if(pos1.y > pos2.y){
            return 1;
        }
        else if(pos1.x < pos2.x){
            return -1;
        }
        else if(pos1.x > pos2.x){
            return 1;
        }
        else {
            return 0;
        }
    });

    var rnd = this.main.game.rnd;
    position.forEach(function(pos) {
        world.create(pos.x+rnd.integerInRange(-20,20), pos.y+rnd.integerInRange(-20,20), this.randomObstacle());
    },this);
};

WorldGenerator.prototype.randomObstacle = function() {
    return Phaser.ArrayUtils.getRandomItem(WorldGenerator.obstacle);
};

WorldGenerator.prototype.createTerrain = function(x, y){
    var sprite = this.terrainGroup.create(x,y,this.randomObstacle());
    sprite.body.immovable = true;
    sprite.body.setSize(64,64,32,32);
};

WorldGenerator.prototype.update = function() {
    var view = this.main.game.camera;
    this.groundSprite.tilePosition.x = -view.x;
    this.groundSprite.tilePosition.y = -view.y;
};

WorldGenerator.prototype.playableRectangle = function() {
    var half = this.playableSize/2;
    return new Phaser.Rectangle(-half, -half, this.playableSize, this.playableSize);
};

WorldGenerator.prototype.worldBounds = function() {
    var half = this.playableSize/2 + this.border/2;
    var full = half * 2;
    return new Phaser.Rectangle(-half, -half, full, full);
};

WorldGenerator.prototype.debug = function() { 
    this.main.game.debug.geom(this.playableRectangle(), 'red', false);
    this.main.game.debug.geom(this.worldBounds(), 'blue', false);
};

WorldGenerator.ground = "ground";
WorldGenerator.obstacle = [];
WorldGenerator.preload = function(game) {
    var basePath = "assets/medieval-rts/PNG/Retina/";
    game.load.image(WorldGenerator.ground, basePath + "Tile/medievalTile_57.png"); 

    filepaths = [];

    for(var i = 0; i < 3; i++)
    {
        if(i != 1){
            filepaths.push(basePath + "Environment/medievalEnvironment_0"+(1+i)+".png");
        }
        filepaths.push(basePath + "Environment/medievalEnvironment_0"+(7+i)+".png");
        filepaths.push(basePath + "Environment/medievalEnvironment_0"+(1+i)+".png");
    }

    var count = 0;
    var baseName = "obstacle";

    filepaths.forEach(function(path) {
        var name = baseName + count++;
        var sprite = game.load.image(name, path);
        WorldGenerator.obstacle.push(name);
    },this);
};

