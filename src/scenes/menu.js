class Menu extends Phaser.Scene {
    init(){}
    preload(){
        this.cache.up = Phaser.Input.Keyboard.KeyCodes.Z;
        this.cache.left = Phaser.Input.Keyboard.KeyCodes.Q;
        this.cache.right = Phaser.Input.Keyboard.KeyCodes.D;
        this.cache.down = Phaser.Input.Keyboard.KeyCodes.SHIFT;
    }
    create(){
        this.menuZone = this.add.rectangle(this.game.canvas.width/2, this.game.canvas.height/2, this.game.canvas.width-800, this.game.canvas.height-400, 0xE7C9B7);
        this.menuZone.setStrokeStyle(4, 0xC9855E);
        this.menuText = this.add.text(this.game.canvas.width/2, 250, "Menu", {fontSize: "50px", fontStyle: "bold", fontFamily: "Calibri", color: "#422616"});
        this.menuText.setOrigin(0.5, 0.5);

        this.buttonNiveau1 = this.add.rectangle(this.menuZone.x, this.menuText.y + this.menuText.height + 100, this.menuZone.width-100, 100, 0xB1663B);
        this.buttonNiveau1.setStrokeStyle(4, 0xC9855E);
        this.buttonNiveau1Text = this.add.text(this.buttonNiveau1.x, this.buttonNiveau1.y, "Commencer", {fontSize: "50px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonNiveau1Text.setOrigin(0.5, 0.5);

        this.buttonParametres = this.add.rectangle(this.menuZone.x, this.buttonNiveau1.y+150, this.menuZone.width-100, 100, 0xB1663B);
        this.buttonParametres.setStrokeStyle(4, 0xC9855E);
        this.buttonParametresText = this.add.text(this.buttonParametres.x, this.buttonParametres.y, "Paramètres", {fontSize: "50px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonParametresText.setOrigin(0.5, 0.5);

        this.buttonNiveau1.setInteractive();
        this.buttonParametres.setInteractive();

        this.buttonNiveau1.on("pointerup", () => {this.scene.start("Niveau1")});
        this.buttonParametres.on("pointerup", () => {this.scene.start("ParametresMenu")});
        this.buttonNiveau1.on("pointerover", () => {
            this.buttonNiveau1.fillColor = 0xD8A78A;
        });
        this.buttonParametres.on("pointerover", () => {
            this.buttonParametres.fillColor = 0xD8A78A;
        });
        this.buttonNiveau1.on("pointerout", () => {
            this.buttonNiveau1.fillColor = 0xB1663B;
        });
        this.buttonParametres.on("pointerout", () => {
            this.buttonParametres.fillColor = 0xB1663B;
        });
    }
    
    update(){}
}