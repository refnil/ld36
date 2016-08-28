function Weapon(main){
    this.main = main;
    this.player = main.player;
    this.input = main.game.input;

    this.speed = 100;
}

Weapon.prototype.create = function(){
    weapon = this.main.game.add.weapon(-1,'bullet');

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    
    weapon.bulletSpeed = 300;
    
    weapon.fireRate = 300;

    weapon.trackSprite(this.player.sprite,85,65, true);

    this.input.mouse.capture = true;

};

Weapon.prototype.update = function(){
    if (this.input.activePointer.leftButton.isDown)
    {
        weapon.fireAtPointer(this.input.mousePointer);
    }
};

Weapon.preload = function(game){
    game.load.image('bullet','assets/tower-defense-top-down/PNG/Retina/towerDefense_tile272.png');
};

