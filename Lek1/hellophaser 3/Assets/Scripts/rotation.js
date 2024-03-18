class Example extends Phaser.Scene
{
    singleImage;
    atlasFrame;

    preload ()
    {
        this.load.image('atari', 'Assets/Images/phaser.png');
        this.load.image('atlas', 'Assets/Images/phaser.png');
        this.load.audio('sound', ['Assets/Sounds/Test.mp3']);
    }

    create ()
    {
        this.atlasFrame = this.add.image(300, 100, 'atlas', 'dragonwiz');
        this.singleImage = this.add.image(300, 300, 'atari');
        var music = this.sound.add('sound');
        music.play();
        music.setLoop(true);
    }

    update ()
    {

        this.atlasFrame.rotation += 0.01;
        this.singleImage.rotation -= 0.01;

    }
}

const config = {
    type: Phaser.AUTO,
    
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);