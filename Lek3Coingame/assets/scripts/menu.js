class Menu extends Phaser.Scene
{
    preload ()
    {
        
    }

    create ()
    {   //press to continue text
        this.scoreText = this.add.text(16, 16, 'Press Space to continue..', { fontSize: '32px', fill: '#fff' });
    }

    update ()
    {
        //skip scene when press space
        if(this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), 500)){
            this.scene.start('Gamescene');
        }
    }

    
}

