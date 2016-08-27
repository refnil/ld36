function Spawner(group, x, y){
    this.enemyGroup = group;
    this.game = group.game;

    this.x = x || 0;
    this.y = y || 0;

    this.inWave = false;
    this.lastTime = 0;
    this.startTime = game.time;
    //this.level = 0;
    
    this.remainingInWave = [];
}


Spawner.prototype.startWave = function () {
    var currentTime = this.getCurrentTime();

    var leader = EnemyFactory.createStrong(this, currentTime);
    remainingInWave.push(leader);

    var nbMinion = game.rnd.integerInRange(3,currentTime / 1000);
    for(var i = 0; i < nbMinion; i++) {
        var minion = EnemyFactory.createMinion(this, currentTime, leader);
        remainingInWave.push(minion);

    }
    this.lastTime = currentTime;
    this.inWave = true;
}

Spawner.prototype.continueWave = function () {
    var currentTime = this.getCurrentTime();

    if(currentTime > lastTime + 2000){
        var enemy = remainingInWave.shift();
        this.enemyGroup.add(enemy);
        enemy.x = this.x;
        enemy.y = this.y;
        enemy.exists = true;
    }

    if(remainingInWave.length == 0) {
        this.inWave = false;
    }
}

Spawner.prototype.isNextWave = function () {
    return false;
}

Spawner.prototype.update = function () {
    if(this.inWave) {
        continueWave();
    }
    else if(this.isNextWaveNow()){
        spawnWave()
    }
}

Spawner.prototype.getCurrentTime = function () {
    return this.game.time-this.startTime;
}

Spawner.preload = function () { 
}
