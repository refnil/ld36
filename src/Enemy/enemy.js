function Enemy(sprite, maxLife, speed, weapon, leader) {
    this.sprite = sprite;
    this.maxLife = maxLife || 100;
    this.speed = speed || 200;
    this.weapon = weapon || null;
    this.leader = leader || null;

    this.life = this.maxLife;
    this.target = null;
    this.lastPos = null;
}

Enemy.prototype.update = function() {
    this.move();
    this.shoot();
}

Enemy.prototype.move = function() {
    if(this.leader != null) {
        this.target = this.leader.target;
    }
    else if(this.target == null){
        this.findTarget();
    }
    else {
        this.moveToTarget();
    }
}

Enemy.prototype.shoot = function() {
    if(this.target != null && this.weapon.range > Phaser.Physics.distanceBetween(this.sprite, this.target)) {
        this.weapon.shoot(target);
    }
}

Enemy.prototype.findTarget = function() {

}

Enemy.prototype.moveToTarget = function() { 
    if(this.lastPos == null) {
        this.lastPos = {'x':this.sprite, 'y':this.sprite.y};
    }
    else{
        var direction = game.physics.arcade.moveToPointer(sprite,this.target, this.speed);
    }
}

Enemy.preload = function() {
    game.load.image('enemy1','assets/tower-defense-top-down/PNG/Retina/towerDefense_tile246.png');
}

