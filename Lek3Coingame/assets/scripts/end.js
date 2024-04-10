class End extends Phaser.Scene {

    constructor() {
        super({ key:'end'});
    }
    preload(){
        this.load.image('end', 'assets/img/end.png');
    }

    create(){
        this.image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'end');
        let scaleX = this.cameras.main.width / this.image.width;
        let scaleY = this.cameras.main.height / this.image.height;
        let scale = Math.max(scaleX, scaleY) ;
        this.image.setScale(scale).setScrollFactor(0);


        this.scoreText = this.add.text(this.cameras.main.width / 3, this.cameras.main.height / 3, 'The end', { fontSize: '128px', fill: '#fff' });
        this.scoreText.setScale (1);
        this.scoreText.setDepth(5);
    }


    update(){

    }
}