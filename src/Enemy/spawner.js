function Spawner(main, x, y){
    this.main = main;
    this.enemyGroup = main.enemiesGroup;
    this.game = main.game;

    this.x = x || 0;
    this.y = y || 0;

    this.inWave = false;
    this.lastTime = 0;
    this.startTime = this.game.time.totalElapsedSeconds();
    
    this.remainingInWave = [];
}


Spawner.prototype.spawnWave= function () {
    var currentTime = this.getCurrentTime();

    var leader = EnemyFactory.createStrong(this.main, currentTime);
    this.remainingInWave.push(leader);

    var nbMinion = this.game.rnd.integerInRange(3,currentTime);
    for(var i = 0; i < nbMinion; i++) {
        var minion = EnemyFactory.createMinion(this.main, currentTime, leader);
        this.remainingInWave.push(minion);

    }
    this.lastTime = currentTime;
    this.inWave = true;
}

Spawner.prototype.continueWave = function () {
    var currentTime = this.getCurrentTime();

    if(this.remainingInWave.length == 0) {
        console.log("Wave ended");
        this.inWave = false;
    }
    else if(currentTime > this.lastTime + 2){
        var enemy = this.remainingInWave.shift();
        enemy.sprite.x =  this.x;
        enemy.sprite.y =  this.y;
        enemy.sprite.exists = true;
        this.enemyGroup.add(enemy.sprite);
        this.lastTime = currentTime;
    }
}

Spawner.prototype.isNextWaveNow = function () {
    return this.game.rnd.between(0,100)==0;
}

Spawner.prototype.update = function () {
    if(this.inWave) {
        this.continueWave();
    }
    else if(this.isNextWaveNow()){
        this.spawnWave()
    }
}

Spawner.prototype.getCurrentTime = function () {
    return this.game.time.totalElapsedSeconds() -this.startTime;
}

Spawner.preload = function () { 
}
