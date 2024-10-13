document.addEventListener("DOMContentLoaded", function () {
    const config = {
        width: 1600,
        height: 992,
		type: Phaser.AUTO,
        backgroundColor: "#5494c9",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
        dom: {
            createContainer: true
        },
        physics: {
            default: "arcade", 
            arcade: {
                debug: false,
                gravity: { y: 1000 }
            }
        }
    }
    var game = new Phaser.Game(config);

    game.scene.add("Niveau1", Niveau1);
    game.scene.add("ParametresMenu", ParametresMenu);
    game.scene.add("ParametresControls", ParametresControls);
    game.scene.add("ParametresSounds", ParametresSounds);
    game.scene.add("Menu", Menu, true);
});