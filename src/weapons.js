function Weapon(){
    this.speed = 100;
}

Weapon.prototype.create = function(game,player){
    weapon = game.add.weapon(-1,'bullet');

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    
    weapon.bulletSpeed = 300;
    
    weapon.fireRate = 300;

    weapon.trackSprite(player.sprite,85,65, true);

    game.input.mouse.capture = true;

};

Weapon.prototype.update = function(game){
    if (game.input.activePointer.leftButton.isDown)
    {
        weapon.fireAtPointer(game.input.mousePointer);
    }
};

Weapon.prototype.preload = function(game){
    game.load.image('bullet','assets/tower-defense-top-down/PNG/Retina/towerDefense_tile272.png');
};

