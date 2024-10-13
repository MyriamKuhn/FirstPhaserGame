class ParametresMenu extends Phaser.Scene {
    create(){
        this.createMenu();
        this.createParamZone();
    }

    createMenu(){
        this.menuZone = this.add.rectangle(0, 0, this.game.canvas.width, 100, 0xE7C9B7);
        this.menuZone.setStrokeStyle(4, 0xC9855E);
        this.menuZone.setOrigin(0, 0);
        this.menuText = this.add.text(this.menuZone.width/2, 50, "Paramètres", {fontSize: "50px", fontStyle: "bold", fontFamily: "Calibri", color: "#422616"});
        this.menuText.setOrigin(0.5, 0.5);

        this.buttonMenu = this.add.rectangle(this.menuZone.x + this.menuZone.width/4, this.menuText.y, this.menuZone.width/4, 50, 0xB1663B);
        this.buttonMenu.setStrokeStyle(4, 0xC9855E);
        this.buttonMenuText = this.add.text(this.buttonMenu.x, this.buttonMenu.y, "Menu", {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonMenuText.setOrigin(0.5, 0.5);

        this.buttonNiveau1 = this.add.rectangle(this.menuZone.x + 3*this.menuZone.width/4, this.menuText.y, this.menuZone.width/4, 50, 0xB1663B);
        this.buttonNiveau1.setStrokeStyle(4, 0xC9855E);
        this.buttonNiveau1Text = this.add.text(this.buttonNiveau1.x, this.buttonNiveau1.y, "Niveau1", {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonNiveau1Text.setOrigin(0.5, 0.5);

        this.buttonMenu.setInteractive();
        this.buttonNiveau1.setInteractive();

        this.buttonMenu.on("pointerup", () => {this.scene.start("Menu")});
        this.buttonNiveau1.on("pointerup", () => {this.scene.start("Niveau1")});
        this.buttonMenu.on("pointerover", () => {
            this.buttonMenu.fillColor = 0xD8A78A;
        });
        this.buttonNiveau1.on("pointerover", () => {
            this.buttonNiveau1.fillColor = 0xD8A78A;
        });
        this.buttonMenu.on("pointerout", () => {
            this.buttonMenu.fillColor = 0xB1663B;
        });
        this.buttonNiveau1.on("pointerout", () => {
            this.buttonNiveau1.fillColor = 0xB1663B;
        });
    }

    createParamZone(){
        this.paramZone = this.add.rectangle(this.game.canvas.width/2, this.game.canvas.height/2 + 50, this.game.canvas.width-800, this.game.canvas.height-400, 0xE7C9B7);
        this.paramZone.setStrokeStyle(4, 0xC9855E);

        this.buttonControls = this.add.rectangle(this.paramZone.x, this.paramZone.y + 100 - this.paramZone.height/2, this.paramZone.width-100, 100, 0xB1663B);
        this.buttonControls.setStrokeStyle(4, 0xC9855E);
        this.buttonControlsText = this.add.text(this.buttonControls.x, this.buttonControls.y, "Controles", {fontSize: "50px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonControlsText.setOrigin(0.5, 0.5);

        this.buttonSounds = this.add.rectangle(this.paramZone.x, this.buttonControls.y+150, this.paramZone.width-100, 100, 0xB1663B);
        this.buttonSounds.setStrokeStyle(4, 0xC9855E);
        this.buttonSoundsText = this.add.text(this.buttonSounds.x, this.buttonSounds.y, "Sons", {fontSize: "50px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonSoundsText.setOrigin(0.5, 0.5);

        this.buttonControls.setInteractive();
        this.buttonSounds.setInteractive();
        
        this.buttonControls.on("pointerup", () => {this.scene.start("ParametresControls")});
        this.buttonSounds.on("pointerup", () => {
            this.scene.start("ParametresSounds")
        });
        this.buttonControls.on("pointerover", () => {
            this.buttonControls.fillColor = 0xD8A78A;
        });
        this.buttonSounds.on("pointerover", () => {
            this.buttonSounds.fillColor = 0xD8A78A;
        });
        this.buttonControls.on("pointerout", () => {
            this.buttonControls.fillColor = 0xB1663B;
        });
        this.buttonSounds.on("pointerout", () => {
            this.buttonSounds.fillColor = 0xB1663B;
        });
    }
}