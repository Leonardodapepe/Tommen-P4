const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#4488aa',
    scene: [Menu, Game, Scene2,Scene3,Scene4],
    physics: {
        default: 'arcade',
        arcade: { debug: true },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autocenter: Phaser.Scale.CENTER_BOTH,
    },

};

const game = new Phaser.Game(config);


