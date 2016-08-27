function Player(){
    this.hp = 100;
    this.mp = 100;
    this.force = 100;
    this.speed = 100;
    this.inventory = [];
    this.skin = 'player';
}

Player.prototype.generate = function(game,weapon){
    this.sprite = game.add.sprite(game.world.centerX,game.world.centerY,'player');  
    
    game.physics.arcade.enable(this.sprite);

    cursors = game.input.keyboard.createCursorKeys();
    
    game.camera.follow(this.sprite);

    fire = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    A = game.input.keyboard.addKey(Phaser.KeyCode.A);
    S = game.input.keyboard.addKey(Phaser.KeyCode.S);
    D = game.input.keyboard.addKey(Phaser.KeyCode.D);
    W = game.input.keyboard.addKey(Phaser.KeyCode.W);
};

Player.prototype.preload = function(game){
    game.load.image('player','assets/medieval-rts/PNG/Retina/Unit/medievalUnit_02.png');
};

Player.prototype.update = function(game){

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y=0;

    if (W.isDown)
    {
        this.sprite.body.velocity.y = -300;
    }

    else if (S.isDown)
    {
        this.sprite.body.velocity.y = 300;
    }

    if (A.isDown)
    {
        this.sprite.body.velocity.x = -300;
    }
    else if (D.isDown)
    {
        this.sprite.body.velocity.x = 300;
    }

};
