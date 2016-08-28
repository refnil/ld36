function Enemy(main, sprite, maxLife, speed, weapon, leader) {
    this.main = main;
    this.game = main.game;
    this.arcade = this.game.physics.arcade;

    this.sprite = sprite;
    this.maxLife = maxLife || 40;
    this.speed = speed || 200;
    this.weapon = weapon || null;
    this.leader = leader || null;

    this.wantedMaxDistanceToTarget = 300;

    this.life = this.maxLife;
    this.target = null;
    this.objectivePosition = {};
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
    this.findObjectivePosition();
}

Enemy.prototype.findObjectivePosition = function() {

    var tx = this.target.sprite.centerX;
    var ty = this.target.sprite.centerY;
    var dist = this.wantedMaxDistanceToTarget;

    this.objectivePosition.x = this.main.game.rnd.between(tx - dist, tx + dist);
    this.objectivePosition.y = this.main.game.rnd.between(ty - dist, tx + dist);
}

Enemy.prototype.moveToTarget = function() { 

    var ox = this.objectivePosition.x;
    var oy = this.objectivePosition.y;

    if (this.arcade.distanceToXY(this.target.sprite, ox, oy) > this.wantedMaxDistanceToTarget) {
        this.findObjectivePosition();
    }
    else if(this.arcade.distanceToXY(this.sprite, ox, oy) > 70){
        this.sprite.rotation = this.arcade.moveToXY(this.sprite, ox, oy, this.speed);
    }
    else {
        this.findObjectivePosition();

    }
}

Enemy.prototype.render = function () {
    if(this.life < this.maxLife) {
        var x = this.sprite.centerX;
        var y = this.sprite.top;
        
        Lifebar.draw(this.main, x, y, this.life/this.maxLife);
    }
}


Enemy.prototype.hit = function(damage) {
    this.life -= damage;
    if(this.life <= 0) {
        this.sprite.destroy();
    }
}

Enemy.preload = function(game) {
}

