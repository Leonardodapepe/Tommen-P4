class Menu extends Phaser.Scene
{
    preload ()
    {
        
    }

    create ()
    {   //press to continue text
        this.scoreText = this.add.text(16, 16, 'Press to continue..', { fontSize: '32px', fill: '#fff' });

        


    }

    update ()
    {
        //skip scene when press space
        if(this.input.activePointer.leftButtonDown()){
            this.scene.start('Gamescene');
            if (IS_TOUCH){
                console.log("phone")
            }
            else{
                console.log("PC")
            }
        }
        
    }

    
}

