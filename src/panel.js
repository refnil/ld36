function Panel(main) {
    this.main = main;
    this.panel = null;
    this.panelSprite = null;
    this.bitmap = null;
}


Panel.prototype.generate = function(){
    this.bitmap = this.main.game.add.bitmapData(this.main.game.width-600, this.main.game.height);
    this.bitmap.fill(0,0,0,1);
    this.panelSprite = this.main.game.add.sprite(600,0,this.bitmap);
    this.panelSprite.fixedToCamera = true;
};


Panel.panel = "panel";
Panel.preload = function(game){
};
