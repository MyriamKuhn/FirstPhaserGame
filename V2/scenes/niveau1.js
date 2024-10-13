class Niveau1 extends Phaser.Scene {
    init(){
        this.levelType = TilesManager.TYPE_GRASS;
        this.tilesManager = new TilesManager(this);
        this.spritesManager = new SpritesManager(this);
    }

    preload(){
        this.tilesManager.loadTiles();
        this.spritesManager.loadSprites();
        this.spritesManager.loadAnims();
        try {
            this.loadFile();
        } catch (error) {
            this.score = this.cache.score || 0;
            this.bourse = this.cache.bourse || {golden: 0, silver: 0, bronze: 0};
        }

        this.load.audio("campagne", ["assets/sounds/campagne.wav", "assets/sounds/campagne.ogg", "assets/sounds/campagne.mp3"]);
        this.load.audio("vent", ["assets/sounds/vent.wav", "assets/sounds/vent.ogg", "assets/sounds/vent.mp3"]);
        this.load.audio("jump", ["assets/sounds/jump.mp3"]);
        this.load.audio("coin", ["assets/sounds/coin.mp3"]);
        this.load.audio("win", ["assets/sounds/win.mp3"]);
    }

    create(){
        this.add.tileSprite(0, this.game.config.height, this.game.config.width, this.game.config.height, 'bg').setOrigin(0, 1);

        createMenu(this, "Niveau1");
        this.getKeys();

        this.platforms = this.physics.add.staticGroup();
        this.coins = this.physics.add.staticGroup();
        this.dinosaurs = this.physics.add.group();

        this.tilesManager.createPlatform(15, 29, 15, 31, this.levelType);
        this.tilesManager.createPlatform(18, 27, 34, 29, this.levelType);
        this.tilesManager.createPlatform(36, 25, 36, 25, this.levelType);
        this.tilesManager.createPlatform(38, 23, 45, 23, this.levelType);
        this.tilesManager.createPlatform(40, 21, 40, 21, this.levelType);
        this.tilesManager.createPlatform(38, 19, 38, 19, this.levelType);
        this.tilesManager.createPlatform(25, 19, 35, 21, this.levelType);
        this.tilesManager.createPlatform(4, 19, 4, 21, this.levelType);
        this.tilesManager.createPlatform(4, 21, 20, 21, this.levelType);
        this.tilesManager.createPlatform(2, 17, 2, 18, this.levelType);
        this.tilesManager.createPlatform(1, 15, 1, 16, this.levelType);
        this.tilesManager.createPlatform(4, 13, 4, 13, this.levelType);
        this.tilesManager.createPlatform(19, 12, 24, 14, this.levelType);
        this.tilesManager.createPlatform(7, 11, 19, 15, this.levelType);
        this.tilesManager.createPlatform(27, 10, 38, 10, this.levelType);
        this.tilesManager.createPlatform(40, 9, 52, 12, this.levelType);

        this.tilesManager.createPlatform(1, 31, 49, 31, this.levelType);
        
        this.spritesManager.createCoin(19, 30, "bronze");
        this.spritesManager.createCoin(18, 30, "bronze");
        this.spritesManager.createCoin(20, 30, "bronze");
        this.spritesManager.createCoin(21, 30, "bronze");
        this.spritesManager.createCoin(22, 30, "bronze");
        this.spritesManager.createCoin(23, 30, "bronze");
        this.spritesManager.createCoin(24, 30, "bronze");
        this.spritesManager.createCoin(25, 30, "bronze");
        this.spritesManager.createCoin(26, 30, "bronze");
        this.spritesManager.createCoin(27, 30, "bronze");
        this.spritesManager.createCoin(28, 30, "bronze");
        this.spritesManager.createCoin(29, 30, "bronze");
        this.spritesManager.createCoin(30, 30, "bronze");
        this.spritesManager.createCoin(31, 30, "bronze");
        this.spritesManager.createCoin(32, 30, "bronze");
        this.spritesManager.createCoin(33, 30, "bronze");
        this.spritesManager.createCoin(34, 30, "bronze");
        
        this.spritesManager.createCoin(45, 22, "silver");
        this.spritesManager.createCoin(45, 21, "silver");

        this.spritesManager.createCoin(28, 16, "silver");
        this.spritesManager.createCoin(29, 16, "silver");
        this.spritesManager.createCoin(30, 16, "silver");

        this.spritesManager.createCoin(20, 11, "silver");

        this.spritesManager.createCoin(44, 7);
        this.spritesManager.createCoin(44, 8);
        this.spritesManager.createCoin(45, 7);
        this.spritesManager.createCoin(45, 8);
        this.spritesManager.createCoin(46, 7);
        this.spritesManager.createCoin(46, 8);

        this.victoryOrb = this.tilesManager.createVictoryOrb(49, 8);

        this.scoreText = this.add.text(5, 105, "Score : " + this.score + "\t Bourse : " + this.bourse.golden + "G, " + this.bourse.silver + "S, " + this.bourse.bronze + "B", {fontSize: "50px", fontFamily: "Calibri", color: "#422616"});
        this.scoreText.setOrigin(0, 0);

        this.player = this.spritesManager.createDinosaur(5, 30, 'blue');
        this.player.anims.play('idle-' + this.player.color);

        this.createEnnemies();

        this.physics.add.collider(this.dinosaurs, this.platforms);
        this.physics.add.overlap(this.player, this.coins, (player, coin) => {
            this.collectCoin(coin);
            coin.disableBody(true, true);
            this.scoreText.setText("Score : " + this.score + "\t Bourse : " + this.bourse.golden + " gold, "
            + this.bourse.silver + " silver, " + this.bourse.bronze + " bronze");
            this.collectCoinSound.play();
        });

        this.musicVolume = this.cache.musicVolume || 1;
        this.soundEffectVolume = this.cache.soundEffectVolume || 1;
        
        this.campagneSound = this.sound.add("campagne", {loop: true, volume: this.musicVolume});
        this.ventSound = this.sound.add("vent", {loop: true, volume: this.musicVolume});
        this.jumpSound = this.sound.add("jump", {volume: this.soundEffectVolume});
        this.collectCoinSound = this.sound.add("coin", {volume: this.soundEffectVolume});
        this.winMusic = this.sound.add("win", {volume: this.musicVolume});

        this.campagneSound.play();
        this.ventSound.play();

        this.volumeImage = this.add.image(1550, 50, "volume-on");
        this.volumeImage.setOrigin(1, 0.5);
        this.volumeImage.setDisplaySize(32, 32);
        this.volumeImage.setInteractive();
        this.volumeImage.on('pointerup', () => {this.toggleMusic()});
        this.volumeText = this.add.text(this.volumeImage.x-16, this.volumeImage.y+32, Math.round(this.sound.volume*100) + "%", {fontSize: "11px", fontFamily: "Calibri", color: "#422616"});
        this.volumeText.setOrigin(0.5, 0.5);

        this.physics.add.overlap(this.player, this.victoryOrb, (player, orb) => {
            this.win();
        });

        this.sound.volume = 0;
        this.paused = false;
    }

    createEnnemies(){
        this.ennemiesGroup = this.add.group();
        this.walkingEnnemies = this.add.group();
        this.jumpingEnnemies = this.add.group();
        let ennemy = this.spritesManager.createDinosaur(5, 20, "yellow");
        this.ennemiesGroup.add(ennemy);
        this.jumpingEnnemies.add(ennemy);
        ennemy = this.spritesManager.createDinosaur(23, 26, "red");
        ennemy.flipX = true;
        this.ennemiesGroup.add(ennemy);
        ennemy = this.spritesManager.createDinosaur(44, 22, "yellow");
        ennemy.flipX = true;
        this.ennemiesGroup.add(ennemy);
        this.jumpingEnnemies.add(ennemy);
        ennemy = this.spritesManager.createDinosaur(14, 20, "red");
        this.ennemiesGroup.add(ennemy);
        ennemy = this.spritesManager.createDinosaur(35, 9, "red");
        ennemy.flipX = true;
        this.ennemiesGroup.add(ennemy);
        ennemy = this.spritesManager.createDinosaur(47, 8, "yellow");
        ennemy.flipX = true;
        this.ennemiesGroup.add(ennemy);
        this.jumpingEnnemies.add(ennemy);
        ennemy = this.spritesManager.createDinosaur(40, 30, "green");
        ennemy.flipX = true;
        ennemy.setVelocityX(-300);
        ennemy.anims.play("run-green");
        this.walkingEnnemies.add(ennemy);
        this.ennemiesGroup.add(ennemy);

        this.jumpingEnnemies.getChildren().forEach(ennemy => {
            this.time.addEvent({ delay: Phaser.Math.Between(1000, 2000), callback: () => {
                if (ennemy.body.onFloor()) {
                    ennemy.setVelocityY(-400);
                }
            }, callbackScope: this, loop: true });
        });
        this.physics.add.overlap(this.player, this.ennemiesGroup, (player, ennemy) => {this.lose()});
    }

    getKeys(){
        this.keys = {
            up: this.input.keyboard.addKey(this.cache.up || Phaser.Input.Keyboard.KeyCodes.Z, true),
            left: this.input.keyboard.addKey(this.cache.left || Phaser.Input.Keyboard.KeyCodes.Q, true),
            right: this.input.keyboard.addKey(this.cache.right || Phaser.Input.Keyboard.KeyCodes.D, true),
            down: this.input.keyboard.addKey(this.cache.down || Phaser.Input.Keyboard.KeyCodes.SHIFT, true),
            save: this.input.keyboard.addKey(this.cache.save || Phaser.Input.Keyboard.KeyCodes.DOWN, true),
            mute: this.input.keyboard.addKey(this.cache.mute || Phaser.Input.Keyboard.KeyCodes.M, true),
            volume_up: this.input.keyboard.addKey(this.cache.volume_up || Phaser.Input.Keyboard.KeyCodes.NUMPAD_ADD, true),
            volume_down: this.input.keyboard.addKey(this.cache.volume_down || Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBTRACT, true),
            pause: this.input.keyboard.addKey(this.cache.volume_down || Phaser.Input.Keyboard.KeyCodes.P, true)
        }
    }

    toggleMusic(){
        if (Math.round(this.sound.volume*100) != 0) {
            this.sound.volume = 0;
            this.volumeImage.setTexture("volume-off");
        } else {
            this.sound.volume = 1;
            this.volumeImage.setTexture("volume-on");
        }
    }

    update(){
        try {
            if (this.keys.save.isDown) {
                this.saveFile();
            }
            if (this.keys.left.isDown) {
                if(this.keys.down.isDown){
                    this.player.setVelocityX(-300);
                    this.player.anims.play("run-" + this.player.color, true);
                } else {
                    this.player.setVelocityX(-150);
                    this.player.anims.play("walk-" + this.player.color, true);
                }
                this.player.flipX = true;
            } else if(this.keys.right.isDown){
                if(this.keys.down.isDown){
                    this.player.setVelocityX(300);
                    this.player.anims.play("run-" + this.player.color, true);
                } else {
                    this.player.setVelocityX(150);
                    this.player.anims.play("walk-" + this.player.color, true);
                }
                this.player.flipX = false;
            } else {
                this.player.setVelocityX(0);
                this.player.anims.play("idle-" + this.player.color, true);
            }
            if (this.keys.up.isDown && this.player.body.onFloor()) {
                this.player.setVelocityY(-400);
                this.jumpSound.play();
            } 

            if (this.input.keyboard.checkDown(this.keys.pause, 1000)) {
                this.togglePause();
            }
        } catch (error) {}
        if (this.input.keyboard.checkDown(this.keys.mute, 1000)) {
            this.toggleMusic();
        }

        if (this.input.keyboard.checkDown(this.keys.volume_down, 100)) {
            this.volumeDown();
        } else if (this.input.keyboard.checkDown(this.keys.volume_up, 100)) {
            this.volumeUp();
        }
        this.volumeText.setText(Math.round(this.sound.volume*100) + "%");
        if(this.sound.volume.toFixed(2)<= 0){
            this.volumeImage.setTexture("volume-off");
        } else {
            this.volumeImage.setTexture("volume-on");
        }

        this.walkingEnnemies.getChildren().forEach(ennemy => {
            if (ennemy.body.onWall()) {
                ennemy.setVelocityX(ennemy.flipX?300:-300);
                ennemy.flipX = !ennemy.flipX;
            }
        });
    }

    togglePause(){
        if (this.paused) {
            this.physics.resume();
        } else {
            this.physics.pause();
        }
        this.paused = !this.paused
    }

    volumeUp(){
        if (Math.round(this.sound.volume*100) < 100) {
            this.sound.volume += 0.01;
        } else {
            this.sound.volume = 1;
        }
    }

    volumeDown(){
        if (Math.round(this.sound.volume*100) > 0) {
            this.sound.volume -= 0.01;
        } else {
            this.sound.volume = 0;
        }
    }

    collectCoin(player, coin){
        switch(coin.coin_type) {
            case "golden":
                this.bourse.golden += 1;
                this.score += 100;
                break;
            case "silver":
                this.bourse.silver += 1;
                this.score += 10;
                if (this.bourse.silver >= 10) {
                    this.bourse.silver -= 10;
                    this.bourse.golden += 1;
                }
                break;
            case "bronze":
                this.bourse.bronze += 1;
                this.score += 1;
                if (this.bourse.bronze >= 100) {
                    this.bourse.bronze -= 100;
                    this.bourse.silver += 1;
                }
                break;
            default: break;
        }
    }
    
    saveFile(){
        var file = {
            score: this.score,
            bourse: this.bourse
        };
        localStorage.setItem('saveFile',JSON.stringify(file));
    }
    
    loadFile(){
        var file = JSON.parse(localStorage.getItem('saveFile'));
        this.score = file.score;
        this.bourse = file.bourse;
    }

    win(){
        this.winMusic.play();
        this.ventSound.stop();
        this.campagneSound.stop();
        this.saveFile();
        this.scene.start("Niveau2");
    }

    lose(){
        this.physics.pause();
        this.player.tint = 0xFF7777;
        this.player.anims.play('idle-blue');
        this.keys = {
            mute: this.input.keyboard.addKey(this.cache.mute || Phaser.Input.Keyboard.KeyCodes.M, true),
            volume_up: this.input.keyboard.addKey(this.cache.volume_up || Phaser.Input.Keyboard.KeyCodes.NUMPAD_ADD, true),
            volume_down: this.input.keyboard.addKey(this.cache.volume_down || Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBTRACT, true),
        };
        this.defeatText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2, "DEFAITE !", {fontSize: "200px", fontStyle: "bold", fontFamily: "Calibri", color: "#FF2532"});
        this.defeatText.setOrigin(0.5, 0.5);
        this.defeatText.setStroke("#1F2532", 10);
        this.cache.score = 0;
        this.cache.bourse = {golden: 0, silver: 0, bronze: 0}
    }
}