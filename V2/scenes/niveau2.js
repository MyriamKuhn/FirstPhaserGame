class Niveau2 extends Phaser.Scene {

    init() {
        this.scale.setGameSize(1600, 1000);

        this.tilesManager = new TilesManager(this);
        this.spritesManager = new SpritesManager(this);
    }

    preload() {
        this.tilesManager.loadTiles();
        this.spritesManager.loadSprites();
        this.spritesManager.loadAnims();

        this.load.audio("campagne", ["assets/sounds/campagne.wav", "assets/sounds/campagne.ogg", "assets/sounds/campagne.mp3"]);
        this.load.audio("vent", ["assets/sounds/vent.wav", "assets/sounds/vent.ogg", "assets/sounds/vent.mp3"]);
        this.load.audio("jump", ["assets/sounds/jump.mp3", "assets/sounds/jump.ogg", "assets/sounds/jump.wav"]);
        this.load.audio("coin", ["assets/sounds/coin.mp3"]);
        this.load.audio("win", ["assets/sounds/win.mp3", "assets/sounds/win.ogg", "assets/sounds/win.wav"]);

        this.musicVolume = this.cache.musicVolume || 1;
        this.soundEffectVolume = this.cache.soundEffectVolume || 1;

        this.loadData();

        this.keys = this.getKeys();
    }

    create() {
        this.add.tileSprite(
            this.game.config.width / 2,
            this.game.config.height / 2,
            this.game.config.width,
            this.game.config.height,
            'bg'
        );

        this.campagneSound = this.sound.add("campagne", {loop: true, volume: this.musicVolume});
        this.ventSound = this.sound.add("vent", {loop: true, volume: this.musicVolume});
        this.jumpSound = this.sound.add("jump", {volume: this.soundEffectVolume});
        this.collectCoinSound = this.sound.add("coin", {volume: this.soundEffectVolume});
        this.winMusic = this.sound.add("win", {volume: this.musicVolume});

        this.campagneSound.play();
        this.ventSound.play();

        this.platforms = this.physics.add.staticGroup();
        this.createPlatforms();

        this.dinosaurs = this.physics.add.group();

        this.player = this.spritesManager.createDinosaur(2, 29, "blue");
        this.physics.add.collider(this.player, this.platforms);

        this.coins = this.physics.add.staticGroup();
        this.createCoins();

        this.createEnemies();

        this.physics.add.overlap(this.player, this.coins, (player, coin) => {
            this.collectCoin(coin);
            coin.disableBody(true, true);
            this.scoreText.setText("Score : " + this.score + "\t Bourse : " + this.bourse.golden + " gold, "
            + this.bourse.silver + " silver, " + this.bourse.bronze + " bronze");
            this.collectCoinSound.play();
        });

        this.scoreText = this.add.text(
            5,
            105,
            "Score : " + this.score + "\t Bourse : " + this.bourse.golden + " gold, "
                + this.bourse.silver + " silver, " + this.bourse.bronze + " bronze" ,
            { fontSize: "50px", fontFamily: "Calibri", color: "#422616" }
        );
        this.scoreText.setOrigin(0, 0);

        this.victoryOrb = this.tilesManager.createVictoryOrb(38, 13);
        this.physics.add.overlap(this.player, this.victoryOrb, () => {this.win()});

        createMenu(this, "Niveau2");
    }

    update() {
        try {
            if (this.keys.left.isDown) {
                this.player.setVelocityX(-150);
                this.player.anims.play("walk-" + this.player.color, true);
                this.player.flipX = true;
            } else if(this.keys.right.isDown){
                this.player.setVelocityX(150);
                this.player.anims.play("walk-" + this.player.color, true);
                this.player.flipX = false;
            } else {
                this.player.setVelocityX(0);
                this.player.anims.play("idle-" + this.player.color, true);
            }

            if (this.keys.up.isDown && this.player.body.onFloor()) {
                this.player.setVelocityY(-400);
                this.jumpSound.play();
            }
        } catch (error) {
            console.log(error);
        }

        this.walkingEnemies.getChildren().forEach(enemy => {
            if (enemy.body.onWall() || enemy.body.x < 0 || enemy.body.x > this.game.config.width) {
                enemy.flipX = !enemy.flipX;
            }
            enemy.setVelocityX(enemy.flipX ? -150 : 150);
        });

        this.jumpingEnemies.getChildren().forEach(enemy => {
            if (enemy.body.onFloor()) {
                enemy.setVelocityY(-400);
            }
        });
    }

    loadData() {
        try {
            var data = JSON.parse(localStorage.getItem('saveData'));
            this.score = data.score;
            this.bourse = data.bourse;
        } catch (error) {
            this.score = 0;
            this.bourse = this.cache.bourse || {golden: 0, silver: 0, bronze: 0};
        }
    };

    createPlatforms() {
        this.tilesManager.createPlatform(0, 30, 51, 32, TilesManager.TYPE_GRASS);
        this.tilesManager.createPlatform(1, 28, 1, 28, TilesManager.TYPE_ROCK);
        this.tilesManager.createPlatform(3, 26, 3, 26, TilesManager.TYPE_ROCK);
        this.tilesManager.createPlatform(5, 25, 10, 26, TilesManager.TYPE_GRASS);
        this.tilesManager.createPlatform(12, 24, 12, 24, TilesManager.TYPE_ROCK);
        this.tilesManager.createPlatform(14, 23, 17, 24, TilesManager.TYPE_GRASS);
        this.tilesManager.createPlatform(12, 24, 12, 24, TilesManager.TYPE_ROCK);
        this.tilesManager.createPlatform(11, 21, 11, 21, TilesManager.TYPE_ROCK);
        this.tilesManager.createPlatform(14, 19, 14, 19, TilesManager.TYPE_ROCK);
        this.tilesManager.createPlatform(16, 18, 20, 19, TilesManager.TYPE_GRASS);
        this.tilesManager.createPlatform(23, 17, 30, 18, TilesManager.TYPE_GRASS);        
        this.tilesManager.createPlatform(33, 16, 33, 16, TilesManager.TYPE_ROCK);
        this.tilesManager.createPlatform(36, 15, 40, 16, TilesManager.TYPE_GRASS);
        this.tilesManager.createPlatform(25, 28, 25, 28, TilesManager.TYPE_ROCK);
        this.tilesManager.createPlatform(27, 26, 27, 26, TilesManager.TYPE_ROCK);
        this.tilesManager.createPlatform(29, 25, 35, 28, TilesManager.TYPE_GRASS);
        this.tilesManager.createPlatform(36, 23, 36, 23, TilesManager.TYPE_ROCK);
        this.tilesManager.createPlatform(38, 21, 38, 21, TilesManager.TYPE_ROCK);
        this.tilesManager.createPlatform(40, 20, 46, 28, TilesManager.TYPE_GRASS);
        this.tilesManager.createPlatform(45, 18, 45, 18, TilesManager.TYPE_ROCK);
        this.tilesManager.createPlatform(42, 16, 42, 16, TilesManager.TYPE_ROCK);
    }

    createCoins() {
        this.spritesManager.createCoin(29, 29, "bronze");
        this.spritesManager.createCoin(32, 29, "bronze");
        this.spritesManager.createCoin(35, 29, "bronze");
        this.spritesManager.createCoin(40, 29, "bronze");
        this.spritesManager.createCoin(43, 29, "bronze");
        this.spritesManager.createCoin(46, 29, "bronze");
        this.spritesManager.createCoin(6, 24, "bronze");
        this.spritesManager.createCoin(7, 24, "bronze");
        this.spritesManager.createCoin(8, 24, "bronze");
        this.spritesManager.createCoin(9, 24, "bronze");
        this.spritesManager.createCoin(17, 16, "silver");
        this.spritesManager.createCoin(18, 15, "silver");
        this.spritesManager.createCoin(19, 16, "silver");
        this.spritesManager.createCoin(31, 23, "silver");
        this.spritesManager.createCoin(32, 22, "silver");
        this.spritesManager.createCoin(33, 23, "silver");
        this.spritesManager.createCoin(33, 15, "golden");
        this.spritesManager.createCoin(42, 15, "golden");
        this.spritesManager.createCoin(45, 17, "golden");
    }

    createEnemies() {
        this.walkingEnemies = this.physics.add.group();
        this.jumpingEnemies = this.physics.add.group();

        this.walkingEnemies.add(this.spritesManager.createDinosaur(25, 29, "red").anims.play("run-red"));
        this.walkingEnemies.add(this.spritesManager.createDinosaur(23, 16, "red").anims.play("run-red"));

        this.jumpingEnemies.add(this.spritesManager.createDinosaur(18, 16, "yellow"));
        this.jumpingEnemies.add(this.spritesManager.createDinosaur(32, 23, "yellow"));
    }

    getKeys() {
        return {
            up: this.input.keyboard.addKey(this.cache.up || Phaser.Input.Keyboard.KeyCodes.Z, true),
            left: this.input.keyboard.addKey(this.cache.left || Phaser.Input.Keyboard.KeyCodes.Q, true),
            right: this.input.keyboard.addKey(this.cache.right || Phaser.Input.Keyboard.KeyCodes.D, true),
            down: this.input.keyboard.addKey(this.cache.down || Phaser.Input.Keyboard.KeyCodes.S, true),
            volume_up: this.input.keyboard.addKey(this.cache.volume_up || Phaser.Input.Keyboard.KeyCodes.NUMPAD_ADD, true),
            volume_down: this.input.keyboard.addKey(this.cache.volume_down || Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBTRACT, true)
        }
    }

    collectCoin(coin) {
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

    lose() {
        this.physics.pause();

        this.keys = {
            mute: this.input.keyboard.addKey(this.cache.mute || Phaser.Input.Keyboard.KeyCodes.M, true),
            volume_up: this.input.keyboard.addKey(this.cache.volume_up || Phaser.Input.Keyboard.KeyCodes.NUMPAD_ADD, true),
            volume_down: this.input.keyboard.addKey(this.cache.volume_down || Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBTRACT, true),
        };
        
        this.cache.score = 0;
        this.cache.bourse = { golden: 0, silver: 0, bronze: 0 };

        this.defeatText = this.add.text(
            this.game.canvas.width/2, 
            this.game.canvas.height/2, 
            "DEFAITE !", 
            {
                fontSize: "200px", 
                fontStyle: "bold", 
                fontFamily: "Calibri", 
                color: "#FF2532"
            });
        this.defeatText.setOrigin(0.5, 0.5);
        this.defeatText.setStroke("#1F2532", 10);
    }

    win() {
        this.physics.pause();

        this.keys = {
            mute: this.input.keyboard.addKey(this.cache.mute || Phaser.Input.Keyboard.KeyCodes.M, true),
            volume_up: this.input.keyboard.addKey(this.cache.volume_up || Phaser.Input.Keyboard.KeyCodes.NUMPAD_ADD, true),
            volume_down: this.input.keyboard.addKey(this.cache.volume_down || Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBTRACT, true),
        };

        this.victoryText = this.add.text(
            this.game.canvas.width/2, 
            this.game.canvas.height/2, 
            "VICTOIRE !",
            {
                fontSize: "200px",
                fontStyle: "bold",
                fontFamily: "Calibri",
                color: "#FFCE33"
            });
        this.victoryText.setOrigin(0.5, 0.5);
        this.victoryText.setStroke("#1F2532", 10);

        this.winMusic.play();
        this.ventSound.stop();
        this.campagneSound.stop();
    }
}

