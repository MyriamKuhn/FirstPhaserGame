class ParametresSounds extends Phaser.Scene {
    create(){
        this.cache.musicVolume = this.cache.musicVolume || 1 ;
        this.cache.soundEffectVolume = this.cache.soundEffectVolume || 1 ;

        this.createMenu();
        this.createParamZone();
        
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP, true);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN, true);
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

        this.ParametresMenu = this.add.rectangle(this.menuZone.x + 3*this.menuZone.width/4, this.menuText.y, this.menuZone.width/4, 50, 0xB1663B);
        this.ParametresMenu.setStrokeStyle(4, 0xC9855E);
        this.ParametresMenuText = this.add.text(this.ParametresMenu.x, this.ParametresMenu.y, "Menu paramètres", {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.ParametresMenuText.setOrigin(0.5, 0.5);

        this.buttonMenu.setInteractive();
        this.ParametresMenu.setInteractive();

        this.buttonMenu.on("pointerup", () => {this.scene.start("Menu")});
        this.ParametresMenu.on("pointerup", () => {this.scene.start("ParametresMenu")});
        this.buttonMenu.on("pointerover", () => {
            this.buttonMenu.fillColor = 0xD8A78A;
        });
        this.ParametresMenu.on("pointerover", () => {
            this.ParametresMenu.fillColor = 0xD8A78A;
        });
        this.buttonMenu.on("pointerout", () => {
            this.buttonMenu.fillColor = 0xB1663B;
        });
        this.ParametresMenu.on("pointerout", () => {
            this.ParametresMenu.fillColor = 0xB1663B;
        });
    }

    createParamZone(){
        this.paramZone = this.add.rectangle(this.game.canvas.width/2, this.game.canvas.height/2 + 50, this.game.canvas.width-800, this.game.canvas.height-400, 0xE7C9B7);
        this.paramZone.setStrokeStyle(4, 0xC9855E);
        
        this.musicVolumeZone = this.add.zone(this.paramZone.x, this.paramZone.y-this.paramZone.height/2+100, this.paramZone.width-100, 80);
        this.musicVolumeText = this.add.text(this.musicVolumeZone.x-this.musicVolumeZone.width/4, this.musicVolumeZone.y, "Volume de la musique", {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.musicVolumeText.setOrigin(0.5, 0.5);
        this.musicVolumeButton = this.add.dom(this.musicVolumeZone.x+this.musicVolumeZone.width/4, this.musicVolumeZone.y, 'input');
        this.musicVolumeButton = this.add.rectangle(this.musicVolumeZone.x+this.musicVolumeZone.width/4, this.musicVolumeZone.y, this.musicVolumeZone.width/2, this.musicVolumeZone.height, 0xFFFFFF);
        this.musicVolumeButtonText = this.add.text(this.musicVolumeButton.x, this.musicVolumeZone.y, Math.round(this.cache.musicVolume * 100) + "%", {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.musicVolumeButtonText.setOrigin(0.5, 0.5);
        this.musicVolumeButton.setInteractive();
        this.musicVolumeButton.on("pointerup", () => {
            this.musicVolumeButton.fillColor = 0xDDDDDD;
            this.soundEffectVolumeButton.fillColor = 0xFFFFFF;
            this.changeActiveButton(this.musicVolumeButtonText, "musicVolume");
        });

        this.soundEffectVolumeZone = this.add.zone(this.paramZone.x, this.musicVolumeZone.y+100, this.paramZone.width-100, 80);
        this.soundEffectVolumeText = this.add.text(this.soundEffectVolumeZone.x-this.soundEffectVolumeZone.width/4, this.soundEffectVolumeZone.y, "Volume des effets sonores", {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.soundEffectVolumeText.setOrigin(0.5, 0.5);
        this.soundEffectVolumeButton = this.add.rectangle(this.soundEffectVolumeZone.x+this.soundEffectVolumeZone.width/4, this.soundEffectVolumeZone.y, this.soundEffectVolumeZone.width/2, this.soundEffectVolumeZone.height, 0xFFFFFF);
        this.soundEffectVolumeButtonText = this.add.text(this.soundEffectVolumeButton.x, this.soundEffectVolumeZone.y, Math.round(this.cache.soundEffectVolume * 100) + "%", {fontSize: "25px", fontStyle: "bold", fontFamily: "Calibri", color: "#000000"});
        this.soundEffectVolumeButtonText.setOrigin(0.5, 0.5);
        this.soundEffectVolumeButton.setInteractive();
        this.soundEffectVolumeButton.on("pointerup", () => {
            this.musicVolumeButton.fillColor = 0xFFFFFF;
            this.soundEffectVolumeButton.fillColor = 0xDDDDDD;
            this.changeActiveButton(this.soundEffectVolumeButtonText, "soundEffectVolume");
        });
    }

    changeActiveButton(activeButtonText, valueToChange){
        this.activeButtonText = activeButtonText;
        this.valueToChange = valueToChange;
    }

    update(){
        if (this.input.keyboard.checkDown(this.up, 100)) {
            switch (this.valueToChange) {
                case "musicVolume":
                    if (Math.round(this.cache.musicVolume*100) < 100) {
                        this.cache.musicVolume += 0.01;
                    } else {
                        this.cache.musicVolume = 1;
                    }
                    break;
            
                case "soundEffectVolume":
                    if (Math.round(this.cache.soundEffectVolume*100) < 100) {
                        this.cache.soundEffectVolume += 0.01;
                    } else {
                        this.cache.soundEffectVolume = 1;
                    }
                    break;
            
                default:
                    console.log("UP");
                    break;
            }
        } else if (this.input.keyboard.checkDown(this.down, 100)) {
            switch (this.valueToChange) {
                case "musicVolume":
                    if (Math.round(this.cache.musicVolume*100) > 0) {
                        this.cache.musicVolume -= 0.01;
                    } else {
                        this.cache.musicVolume = 0;
                    }
                    break;
            
                case "soundEffectVolume":
                    if (Math.round(this.cache.soundEffectVolume*100) > 0) {
                        this.cache.soundEffectVolume -= 0.01;
                    } else {
                        this.cache.soundEffectVolume = 0;
                    }
                    break;
            
                default:
                    console.log("DOWN");
                    break;
            }
        }
        this.musicVolumeButtonText.setText(Math.round(this.cache.musicVolume * 100) + "%");
        this.soundEffectVolumeButtonText.setText(Math.round(this.cache.soundEffectVolume * 100) + "%");
    }
}