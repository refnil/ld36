function Item(main){
    this.main = main;
    this.force = 0;
    this.speed = 0;
    this.defense = 0;
    this.sprite = null;

}


Item.prototype.generate = function(x,y){

    this.sprite = this.main.game.add.sprite(x,y,'item'); 
    this.sprite.scale.setTo(2,2);
    this.force = this.main.game.rnd.between(10,50);
    this.speed = this.main.game.rnd.between(10,50);
    this.defense = this.main.game.rnd.between(10,50);

    this.sprite.item = this;
};

Item.prototype.update = function(){
};

Item.preload = function(game){
    game.load.image('item','assets/coffre.png');
};

function collectItem(player,item){
    item.kill();
};
