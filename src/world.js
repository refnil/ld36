function WorldGenerator(){
    this.wall = {
        'left': 'wall-left',
        'right': 'wall-right',
        'top': 'wall-top',
        'bottom': 'wall-bottom',
    };

    this.obstacle = ['tree', 'rock'];

    this.ground = "ground";

    this.width = 2000;
}

WorldGenerator.prototype.generate = function(game) {
    var xy = this.width/2;
    var width = this.width;
    game.world.setBounds(xy,xy,width,width);

    game.add.tileSprite(-100,-100,1600,1600,this.ground);

    for(var i = 0; i < 10; i++)
    {
        this.addRandomObstacle(game.world);
    }
};

WorldGenerator.prototype.addRandomObstacle = function(world) {
    world.create(world.randomX, world.randomY,Phaser.ArrayUtils.getRandomItem(this.obstacle));
}

WorldGenerator.prototype.makeBounds = function(world) {


}

WorldGenerator.prototype.preload = function(game) {
    var basePath = "assets/medieval-rts/PNG/Retina/";
    game.load.image(this.ground, basePath + "Tile/medievalTile_57.png"); 
    game.load.image(this.obstacle[0], basePath + "Environment/medievalEnvironment_01.png");
    game.load.image(this.obstacle[1], basePath + "Environment/medievalEnvironment_09.png");
};
