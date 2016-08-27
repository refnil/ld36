function WorldGenerator(){
    this.obstacle = [];

    this.ground = "ground";

    this.playableSize = 800;
    this.border = 128;

    this.terrainGroup = null;
    this.groundSprite = null;
}


WorldGenerator.prototype.generate = function(game) {

    this.terrainGroup = game.add.group();
    this.terrainGroup.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    var bounds = this.worldBounds();

    game.world.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);

    this.groundSprite = game.add.tileSprite(0,0,game.camera.width,game.camera.height,this.ground);
    game.world.sendToBack(this.groundSprite);

    for(var i = 0; i < 10; i++)
    {
        this.addRandomObstacle(game.world);
    }

    this.makeBounds(game.world);
};

WorldGenerator.prototype.addRandomObstacle = function(world) {
    var playable = this.playableRectangle();
    playable.width -= this.border;
    playable.height-= this.border;
    this.createTerrain(playable.randomX, playable.randomY);
};

WorldGenerator.prototype.makeBounds = function(world) {
    var width = world.width;
    var borderArea = width - (this.playableSize * this.playableSize);
    
    var position = [];

    var xleft = -width/2;
    var xright = width/2-this.border;
    var ybot = xright;
    var ytop = xleft;

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


    obstacle = this.obstacle;
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

    position.forEach(function(pos) {
        this.createTerrain(pos.x+world.game.rnd.integerInRange(-20,20), pos.y+world.game.rnd.integerInRange(-20,20));
    },this);
};

WorldGenerator.prototype.createTerrain = function(x, y){
    var sprite = this.terrainGroup.create(x,y,Phaser.ArrayUtils.getRandomItem(this.obstacle));
    sprite.body.immovable = true;
};

WorldGenerator.prototype.preload = function(game) {
    var basePath = "assets/medieval-rts/PNG/Retina/";
    game.load.image(this.ground, basePath + "Tile/medievalTile_57.png"); 
    var count = 0;
    var baseName = "obstacle";
    for(var i = 0; i < 3; i++)
    {
        if(i != 1){
            name = baseName + count++;
            this.obstacle.push(name);
            game.load.image(name, basePath + "Environment/medievalEnvironment_0"+(1+i)+".png");
        }
        name = baseName + count++;
        this.obstacle.push(name);
        game.load.image(name, basePath + "Environment/medievalEnvironment_0"+(7+i)+".png");
        name = baseName + count++;
        this.obstacle.push(name);
        game.load.image(name, basePath + "Environment/medievalEnvironment_1"+(4+i)+".png");
    }
};

WorldGenerator.prototype.update = function(game) {
    var view = game.camera.view;
    this.groundSprite.x = view.x;
    this.groundSprite.y = view.y;
    this.groundSprite.tilePosition.x = view.x % 128;
    this.groundSprite.tilePosition.y = view.y % 128;
};

WorldGenerator.prototype.playableRectangle = function() {
    var half = this.playableSize/2;
    return new Phaser.Rectangle(-half, -half, this.playableSize, this.playableSize);
};

WorldGenerator.prototype.worldBounds = function() {
    var half = this.playableSize/2 + this.border;
    var full = half * 2;
    return new Phaser.Rectangle(-half, -half, full, full);
};

WorldGenerator.prototype.debug = function(game) { 
    game.debug.geom(this.playableRectangle(), 'red', false);
    game.debug.geom(this.worldBounds(), 'blue', false);
};
