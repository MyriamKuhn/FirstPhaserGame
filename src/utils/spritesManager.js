class SpritesManager {
    constructor(scene){
        this.scene = scene;
    }

    loadSprites(){
        this.scene.load.spritesheet('blue', 
            'assets/images/blue.png',
            { frameWidth: 24, frameHeight: 18 }
        );
        this.scene.load.spritesheet('green', 
            'assets/images/green.png',
            { frameWidth: 24, frameHeight: 18 }
        );
        this.scene.load.spritesheet('red', 
            'assets/images/red.png',
            { frameWidth: 24, frameHeight: 18 }
        );
        this.scene.load.spritesheet('yellow', 
            'assets/images/yellow.png',
            { frameWidth: 24, frameHeight: 18 }
        );
        this.scene.load.spritesheet('coins', 
            'assets/images/coins.png',
            { frameWidth: 16, frameHeight: 16 }
        );
    }

    addAnims(){
        this.scene.load.animation("dinos", "assets/anims/dinos.json");
        this.scene.load.animation("coins", "assets/anims/coins.json");
    }

    createDinosaur(x, y, color){ 
        if( !['blue', 'green', 'red', 'yellow'].includes(color) ) {
            color = 'blue';
        }
        let dinosaur = this.scene.dinosaurs.create(x*32, y*32, color);
        dinosaur.body.setCollideWorldBounds(true);
        dinosaur.anims.play('idle-' + color);
        dinosaur.scaleX = 32/24;
        dinosaur.scaleY = 32/18;
        dinosaur.refreshBody();
        dinosaur.color = color;
        return dinosaur;
    }

    createCoin(x, y, coin_type = 'golden'){
        if( !['golden', 'silver', 'bronze'].includes(coin_type) ) {
            coin_type = 'golden';
        }
        let coin = this.scene.coins.create(x*32, y*32, coin_type + '-coin');
        coin.body.touchable = false;
        coin.anims.play(coin_type + '-coin');
        coin.body.setSize(16, 16);
        coin.body.x += 8;
        coin.body.y += 8;
        coin.coin_type = coin_type;
        return coin;
    }
}
