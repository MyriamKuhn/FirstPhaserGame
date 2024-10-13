class TilesManager {
    static TYPE_GRASS = "grass";
    static TYPE_MECH = "mech";
    static TYPE_POISON = "poison";
    static TYPE_ROCK = "rock";
    static TYPE_ICE = "ice";

    constructor(scene){
        this.scene = scene;
    }

    /**
     * Charge la TileSheet du projet
     */
    loadTiles(){
        this.scene.load.spritesheet('tiles', 
            'assets/images/TileSheet.png',
            { frameWidth: 32, frameHeight: 32 }
        );
    }

    /**
     * Crée une plateforme en fonction de son type et de ses emplacements
     * @param {number} x1 le côté gauche de la plateforme
     * @param {number} y1 Le côté haut de la plateforme
     * @param {number} x2 le côté droit de la plateforme
     * @param {number} y2 le côté gauche de la plateforme
     * @param {string} type le type d'environnement
     */
    createPlatform(x1, y1, x2, y2, type){
        if (x1 == x2) {
            if (y1 == y2) {
                this.createSingleCelledPlatform(x1, y1, type);
            } else {
                this.createColumnPlatform(x1, y1, y2, type);
            }
        } else if (y1 == y2) {
            this.createLinePlatform(x1, x2, y1, type);
        } else {
            this.createRectPlatform(x1, x2, y1, y2, type);
        }
    }
    
    /**
     * Crée une plateforme d'une cellule
     * @param {number} x La position en absisce de la plateforme
     * @param {number} y La position en ordonnée de la plateforme
     * @param {string} type le type d'environnement
     */
    createSingleCelledPlatform(x, y, type){
        const decalage = this.getDecalageFromType(type);
        this.scene.platforms.create(x*32, y*32, 'tiles', 1 + decalage);
    }
    
    /**
     * Crée une plateforme sur une ligne
     * @param {number} x1 le côté gauche de la plateforme
     * @param {number} x2 le côté droit de la plateforme
     * @param {number} y La position en ordonnée de la plateforme
     * @param {string} type le type d'environnement
     * @returns void
     */
    createLinePlatform(x1, x2, y, type){
        if (x1 > x2) {
            return this.createLinePlatform(x2, x1, y, type);
        }
        const decalage = this.getDecalageFromType(type);
        
        /* Nous créons les bords */
        this.scene.platforms.create(x1*32, y*32, 'tiles', 20 + decalage);
        this.scene.platforms.create(x2*32, y*32, 'tiles', 22 + decalage);

        /* Nous créons l'intérieur */
        for (let x = x1+1; x < x2; x++) {
            this.scene.platforms.create(x*32, y*32, 'tiles', 21 + decalage);
        }
    }
    
    /**
     * Crée une plateforme sur une colonne
     * @param {number} x La position en absisce de la plateforme
     * @param {number} y1 Le côté haut de la plateforme
     * @param {number} y2 le côté gauche de la plateforme
     * @param {string} type le type d'environnement
     * @returns void
     */
    createColumnPlatform(x, y1, y2, type){
        if (y1 > y2) {
            return this.createLinePlatform(x, y2, y1, type);
        }
        const decalage = this.getDecalageFromType(type);

        /* Nous créons les bords */
        this.scene.platforms.create(x*32, y1*32, 'tiles', 19 + decalage);
        this.scene.platforms.create(x*32, y2*32, 'tiles', 51 + decalage);

        /* Nous créons l'intérieur */
        for (let y = y1+1; y < y2; y++) {
            this.scene.platforms.create(x*32, y*32, 'tiles', 35 + decalage);
        }
    }
    

    /**
     * Crée une plateforme rectangulaire
     * @param {number} x1 le côté gauche de la plateforme
     * @param {number} y1 Le côté haut de la plateforme
     * @param {number} x2 le côté droit de la plateforme
     * @param {number} y2 le côté gauche de la plateforme
     * @param {string} type le type d'environnement
     * @returns void
     */
    createRectPlatform(x1, x2, y1, y2, type){
        if (y1 > y2) {
            return this.createRectPlatform(x2, x1, y1, y2, type);
        }
        if (y1 > y2) {
            return this.createRectPlatform(x1, x2, y2, y1, type);
        }
        const decalage = this.getDecalageFromType(type);

        /* Nous créons les quatres coins */
        this.scene.platforms.create(x1*32, y1*32, 'tiles', 16 + decalage);
        this.scene.platforms.create(x2*32, y1*32, 'tiles', 18 + decalage);
        this.scene.platforms.create(x1*32, y2*32, 'tiles', 48 + decalage);
        this.scene.platforms.create(x2*32, y2*32, 'tiles', 50 + decalage);

        /* Nous créons les colonnes à gauche et à droite */
        for (let y = y1+1; y < y2; y++) {
            this.scene.platforms.create(x1*32, y*32, 'tiles', 32 + decalage);
            this.scene.platforms.create(x2*32, y*32, 'tiles', 34 + decalage);
        }

        /* Nous créons l'intérieur colonne par colonne */
        for (let x = x1+1; x < x2; x++) {
            this.scene.platforms.create(x*32, y1*32, 'tiles', 17 + decalage);
            for (let y = y1+1; y < y2; y++) {
                this.scene.platforms.create(x*32, y*32, 'tiles', 33 + decalage);
            }
            this.scene.platforms.create(x*32, y2*32, 'tiles', 49 + decalage);
        }
    }

    /**
     * Donne le décalage nécessaire pour accéder aux Tiles de l'environnement choisi.
     * @param {string} type le type d'environnement
     * @returns {number} Le décalage pour arriver à l'environnement voulu
     */
    getDecalageFromType(type){ 
        if (type == TilesManager.TYPE_GRASS) {
            return 0 + 0;
        }
        if (type == TilesManager.TYPE_MECH) {
            return 8 + 0;
        }
        if (type == TilesManager.TYPE_POISON) {
            return 0 + 64;
        }
        if (type == TilesManager.TYPE_ROCK) {
            return 8 + 64;
        }
        if (type == TilesManager.TYPE_ICE) {
            return 8 + 128;
        }
        return 0;
    }
}