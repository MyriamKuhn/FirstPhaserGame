class Parametres extends Phaser.Scene {
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
        
        this.buttonUpZone = this.add.zone(this.paramZone.x, this.paramZone.y-this.paramZone.height/2+100, this.paramZone.width-100, 80);
        this.buttonUpText = this.add.text(this.buttonUpZone.x-this.buttonUpZone.width/4, this.buttonUpZone.y, "Bouton saut", {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonUpText.setOrigin(0.5, 0.5);
        this.buttonUpButton = this.add.rectangle(this.buttonUpZone.x+this.buttonUpZone.width/4, this.buttonUpZone.y, this.buttonUpZone.width/2, this.buttonUpZone.height, 0xFFFFFF);
        this.buttonUpButtonText = this.add.text(this.buttonUpButton.x, this.buttonUpZone.y, this.getKeyStringByKeyCode(this.cache.up || Phaser.Input.Keyboard.KeyCodes.SPACE), {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonUpButtonText.setOrigin(0.5, 0.5);
        this.buttonUpButton.setInteractive();
        this.buttonUpButton.on("pointerup", () => {this.changeKey(this.buttonUpButtonText, "up", null)});
        
        this.buttonLeftZone = this.add.zone(this.paramZone.x, this.buttonUpZone.y+100, this.paramZone.width-100, 80);
        this.buttonLeftText = this.add.text(this.buttonLeftZone.x-this.buttonLeftZone.width/4, this.buttonLeftZone.y, "Déplacement à gauche", {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonLeftText.setOrigin(0.5, 0.5);
        this.buttonLeftButton = this.add.rectangle(this.buttonLeftZone.x+this.buttonLeftZone.width/4, this.buttonLeftZone.y, this.buttonLeftZone.width/2, this.buttonLeftZone.height, 0xFFFFFF);
        this.buttonLeftButtonText = this.add.text(this.buttonLeftButton.x, this.buttonLeftZone.y, this.getKeyStringByKeyCode(this.cache.left || Phaser.Input.Keyboard.KeyCodes.LEFT), {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonLeftButtonText.setOrigin(0.5, 0.5);
        this.buttonLeftButton.setInteractive();
        this.buttonLeftButton.on("pointerup", () => {this.changeKey(this.buttonLeftButtonText, "left", null)});
        
        this.buttonRightZone = this.add.zone(this.paramZone.x, this.buttonLeftZone.y+100, this.paramZone.width-100, 80);
        this.buttonRightText = this.add.text(this.buttonRightZone.x-this.buttonRightZone.width/4, this.buttonRightZone.y, "Déplacement à droite", {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonRightText.setOrigin(0.5, 0.5);
        this.buttonRightButton = this.add.rectangle(this.buttonRightZone.x+this.buttonRightZone.width/4, this.buttonRightZone.y, this.buttonRightZone.width/2, this.buttonRightZone.height, 0xFFFFFF);
        this.buttonRightButtonText = this.add.text(this.buttonRightButton.x, this.buttonRightZone.y, this.getKeyStringByKeyCode(this.cache.right || Phaser.Input.Keyboard.KeyCodes.RIGHT), {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonRightButtonText.setOrigin(0.5, 0.5);
        this.buttonRightButton.setInteractive();
        this.buttonRightButton.on("pointerup", () => {this.changeKey(this.buttonRightButtonText, "right", null)});
        
        this.buttonDownZone = this.add.zone(this.paramZone.x, this.buttonRightZone.y+100, this.paramZone.width-100, 80);
        this.buttonDownText = this.add.text(this.buttonDownZone.x-this.buttonDownZone.width/4, this.buttonDownZone.y, "Courir", {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonDownText.setOrigin(0.5, 0.5);
        this.buttonDownButton = this.add.rectangle(this.buttonDownZone.x+this.buttonDownZone.width/4, this.buttonDownZone.y, this.buttonDownZone.width/2, this.buttonDownZone.height, 0xFFFFFF);
        this.buttonDownButtonText = this.add.text(this.buttonDownButton.x, this.buttonDownZone.y, this.getKeyStringByKeyCode(this.cache.down || Phaser.Input.Keyboard.KeyCodes.DOWN), {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.buttonDownButtonText.setOrigin(0.5, 0.5);
        this.buttonDownButton.setInteractive();
        this.buttonDownButton.on("pointerup", () => {this.changeKey(this.buttonDownButtonText, "down", null)});
    }

    getKeyStringByKeyCode(value) {
        return Object.keys(Phaser.Input.Keyboard.KeyCodes).find(key => Phaser.Input.Keyboard.KeyCodes[key] === value);
    }

    changeKey(buttonText, keyToChange, keyCode){
        if (keyCode !== null){
            this.lastButtonClickedText.setText(this.getKeyStringByKeyCode(keyCode));
            this.lastButtonClickedText = null;
            this.lastValueRemembered = null;
            switch (keyToChange) {
                case "up":
                    this.cache.up = keyCode;
                    break;
            
                case "left":
                    this.cache.left = keyCode;
                    break;
            
                case "right":
                    this.cache.right = keyCode;
                    break;
            
                case "down":
                    this.cache.down = keyCode;
                    break;
            
                default:
                    break;
            }
            return;
        }

        this.input.keyboard.removeAllListeners();

        if (this.lastButtonClickedText !== null && this.lastButtonClickedText !== undefined) {
            this.lastButtonClickedText.setText(this.lastValueRemembered);
        }

        this.lastButtonClickedText = buttonText;
        this.lastValueRemembered = buttonText.text;
        buttonText.setText("Appuyez sur la touche à changer");

        const scene = this;

        this.input.keyboard.once('keydown', function (event) {
            scene.changeKey(buttonText, keyToChange, event.keyCode);
        });
    }
}