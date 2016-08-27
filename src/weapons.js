function Weapon(){
    this.speed = 100;
}

Weapon.prototype.create = function(game,player){
    weapon = game.add.weapon(-1,'bullet');

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    
    weapon.bulletSpeed = 300;
    
    weapon.fireRate = 300;

    weapon.trackSprite(player.sprite,60,60, true);

    cursors = game.input.keyboard.createCursorKeys();
    fire = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

}

Weapon.prototype.update = function(game){
    if (fire.isDown)
    {
        weapon.fire();
    }
};

Weapon.prototype.preload = function(game){
    game.load.image('bullet','assets/tower-defense-top-down/PNG/Retina/towerDefense_tile272.png');
};

