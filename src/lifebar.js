function Lifebar() {

}

Lifebar.width = 32;
Lifebar.rectangle = new Phaser.Rectangle(0,0,Lifebar.width,10);

Lifebar.draw = function (game, x, y, percentage) {

    Lifebar.rectangle.width = Lifebar.width;
    Lifebar.rectangle.x = x;
    Lifebar.rectangle.y = y;

    game.debug.geom(Lifebar.rectangle,'lime');

    Lifebar.rectangle.width = Lifebar.width * (1-percentage);
    Lifebar.rectangle.x += Lifebar.width * percentage;
    game.debug.geom(Lifebar.rectangle,'red');
    
};
