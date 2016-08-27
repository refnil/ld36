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
 //   game.world.bounds = new Rectangle(xy,xy,width,width);

    game.add.tileSprite(0,0,1024,1024,this.ground);
};

WorldGenerator.prototype.preload = function(game) {
    var basePath = "assets/medieval-rts/PNG/Retina/";
    game.load.image(this.ground, basePath + "Tile/medievalTile_57.png"); 
    game.load.image(this.obstacle[0], basePath + "Environment/medievalEnvironment_01.png");
    game.load.image(this.obstacle[1], basePath + "Environment/medievalEnvironment_09.png");
};
