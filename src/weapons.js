function Weapon(main){
    this.main = main;
    this.player = main.player;
    this.input = main.game.input;

    this.speed = 100;
}

Weapon.prototype.create = function(){
    this.weapon = this.main.game.add.weapon(-1,'bullet');

    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    
    this.weapon.bulletSpeed = 700;
    
    this.weapon.fireRate = 100;

    this.weapon.onFire.add(scaleBullet);

    this.input.mouse.capture = true;

};

Weapon.prototype.update = function(){
    if (this.input.activePointer.leftButton.isDown)
    {
        var line = new Phaser.Line(this.player.sprite.centerX,this.player.sprite.centerY,this.main.game.input.mousePointer.worldX,this.main.game.input.mousePointer.worldY);
        var circle = new Phaser.Circle(this.player.sprite.centerX,this.player.sprite.centerY, 64);
        var point = circle.circumferencePoint(line.angle, false);
        this.weapon.fireFrom.x = point.x;
        this.weapon.fireFrom.y = point.y;
        this.weapon.fireAtPointer(this.main.game.input.mousePointer);
    }
};

Weapon.preload = function(game){
    game.load.image('bullet','assets/tower-defense-top-down/PNG/Retina/towerDefense_tile272.png');
};

function scaleBullet(sprite,weapon){
    sprite.scale.setTo(0.5,0.5);
};
