function Player(game){
    this.hp = 100;
    this.mp = 100;
    this.force = 100;
    this.speed = 100;
    this.inventory = [];
    game.add.sprite(game.world.width-100,game.world.height-100,'player')
}
