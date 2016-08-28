function Enemy(main, sprite, maxLife, speed, weapon, leader) {
    this.main = main;
    this.game = main.game;
    this.arcade = this.game.physics.arcade;

    this.sprite = sprite;
    this.maxLife = maxLife || 100;
    this.speed = speed || 200;
    this.weapon = weapon || null;
    this.leader = leader || null;

    this.life = this.maxLife;
    this.target = null;
    this.lastPos = null;

    sprite.enemy = this;
}

Enemy.prototype.update = function() {
    this.move();
    this.shoot();
}

Enemy.prototype.move = function() {
    if(this.target == null){
        if(this.leader != null) {
            this.target = this.leader.target;
        }
        else {
            this.findTarget();
        }
    }
    else {
        this.moveToTarget();
    }
}

Enemy.prototype.shoot = function() {
    if(this.weapon != null && this.target != null && this.weapon.range > Phaser.Physics.distanceBetween(this.sprite, this.target)) {
        this.weapon.shoot(target);
    }
}

Enemy.prototype.findTarget = function() {
    this.target = this.main.player;

}

Enemy.prototype.moveToTarget = function() { 
    if(this.lastPos == null) {
        this.lastPos = {'x':this.sprite, 'y':this.sprite.y};
    }
    else{
        var tx = this.target.sprite.centerX;
        var ty = this.target.sprite.centerY;

        if(this.arcade.distanceToXY(this.sprite, tx, ty) > 70){
            this.sprite.rotation = this.arcade.moveToXY(this.sprite, tx, ty, this.speed);
        }
        else {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }
    }
}

Enemy.preload = function(game) {
}

