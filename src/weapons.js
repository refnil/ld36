function Weapon(){
    this.speed = 100;
}

Weapon.prototype.create = function(game,player){
    this.weapon = game.add.weapon(-1,'bullet');

    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    
    this.weapon.bulletSpeed = 300;
    
    this.weapon.fireRate = 300;

    // this.weapon.trackSprite(player.sprite,85,65, true);

    this.weapon.onFire.add(scaleBullet);

    game.input.mouse.capture = true;

};

Weapon.prototype.update = function(game,player){
    if (game.input.activePointer .leftButton.isDown)
    {
        line = new Phaser.Line(player.sprite.centerX,player.sprite.centerY,game.input.mousePointer.worldX,game.input.mousePointer.worldY);
        circle = new Phaser.Circle(player.sprite.centerX,player.sprite.centerY, 64);
        point = circle.circumferencePoint(line.angle, false);
        this.weapon.fireFrom.x = point.x;
        this.weapon.fireFrom.y = point.y;
        this.weapon.fireAtPointer(game.input.mousePointer);
    }
};

Weapon.prototype.preload = function(game){
    game.load.image('bullet','assets/tower-defense-top-down/PNG/Retina/towerDefense_tile272.png');
};

function scaleBullet(sprite,weapon){
    sprite.scale.setTo(0.5,0.5);
};
