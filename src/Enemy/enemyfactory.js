function EnemyFactory () {}

EnemyFactory.createStrong = function(main, time) {
    var e = EnemyFactory.getSprite(main, "enemy1"); 
    return new Enemy(main,e);
}

EnemyFactory.createMinion = function(main, time, leader) { 
    var e = EnemyFactory.getSprite(main, "enemy1"); 
    return new Enemy(main,e);
}


EnemyFactory.getSprite = function(main, spriteName) {
    var e = main.game.add.sprite(0,0, spriteName);
    main.game.physics.arcade.enable(e);
    e.exists = false;
    e.anchor.x = 0.5;
    e.anchor.y = 0.5;
    e.body.bounce.set(1);
    e.body.setSize(64,64,32,32);
    return e;
}

EnemyFactory.preload = function (game) { 
    game.load.image('enemy1','assets/tower-defense-top-down/PNG/Retina/towerDefense_tile246.png');
}
