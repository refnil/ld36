function Player(){
    this.hp = 100;
    this.mp = 100;
    this.force = 100;
    this.speed = 100;
    this.inventory = [];
    this.skin = 'player';
}

Player.prototype.generate = function(game){
    this.sprite = game.add.sprite(game.world.centerX,game.world.centerY,'player');  
    
    game.physics.arcade.enable(this.sprite);

    cursors = game.input.keyboard.createCursorKeys();
    
    game.camera.follow(this.sprite);
};

Player.prototype.preload = function(game){
    game.load.image('player','assets/medieval-rts/PNG/Retina/Unit/medievalUnit_02.png');
};

Player.prototype.update = function(game){

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y=0;

    if (cursors.up.isDown)
    {
        console.log("up");
        this.sprite.body.velocity.y = 300;
    }

    else if (cursors.down.isDown)
    {
        this.sprite.body.velocity.y = -300;
    }

    if (cursors.left.isDown)
    {
        this.sprite.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 300;
    }

};
