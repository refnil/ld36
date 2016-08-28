function Panel(main) {
    this.main = main;
    this.panel = null;
    this.panelSprite = null;
    this.bitmap = null;
    this.inventorySpriteGroup = [];
    this.lifeBarSprite = null;
}


Panel.prototype.generate = function(){

    this.panelSprite = this.main.add.group();
    // this.inventorySpriteGroup = [];
        // this.main.add.group()

    this.bitmap = this.main.game.add.bitmapData(this.main.game.width-600, this.main.game.height);
    this.bitmap.fill(44,117,255,1);
    
    this.inventorySpriteGroup.push(this.main.add.sprite(605,300,'boxe'));
    this.inventorySpriteGroup[0].scale.setTo(0.3,0.3);
    for (var i = 0; i < 5; i++)
    {
        this.inventorySpriteGroup.push(this.main.add.sprite(605+32*(i+1),300,'boxe'));
        this.inventorySpriteGroup[i+1].scale.setTo(0.3,0.3);
    };
    for (var i = 0; i < 6; i++)
    {
        this.inventorySpriteGroup.push(this.main.add.sprite(605+32*(i),332,'boxe'));
        this.inventorySpriteGroup[i+6].scale.setTo(0.3,0.3);
    };



    this.panelSprite.create(600,0,this.bitmap);

    // this.inventorySpriteGroup.create(2032,250,'boxe');
    // for (var i = 0; i < 5; i++)
    // {
    //     this.inventorySpriteGroup.create(600+64*i,300,'boxe');
    // }
    // this.inventorySpriteGroup.setAllChildren('scale',0.3)

    this.panelSprite.addMultiple(this.inventorySpriteGroup);    
    this.panelSprite.fixedToCamera = true;
};


Panel.panel = "panel";
Panel.preload = function(game){
    game.load.image('boxe','assets/ui-rpg/PNG/panel_beige.png');
};
