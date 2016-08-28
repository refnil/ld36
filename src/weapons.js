function Weapon(main){
    this.main = main;
    this.player = main.player;
    this.input = main.game.input;

    this.damage = 10;

    this.speed = 100;
}

Weapon.prototype.create = function(){
    this.weapon = this.main.game.add.weapon(35,'bullet');

    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bullets.enableBody = true;
    this.weapon.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
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

Weapon.bulletHitKill = function(bullet, other) {
    bullet.kill();
}

Weapon.bulletHitEnemy = function(bullet, enemy) {
    bullet.kill();
    enemy.enemy.hit(10);
}

Weapon.preload = function(game){
    game.load.image('bullet','assets/tower-defense-top-down/PNG/Retina/towerDefense_tile272.png');
};

function scaleBullet(sprite,weapon){
    sprite.scale.setTo(0.5,0.5);
    sprite.body.setSize(64,64,32,32);
    sprite.body.setCircle(16);
};
