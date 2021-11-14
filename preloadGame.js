class preloadGame extends Phaser.Scene {
    constructor() {
        super("PreloadGame");
    }

    preload() {
      this.load.image("bg", "assets/images/bg.png");
      this.load.image("player", "assets/images/player1.png");
      this.load.image("ast1", "assets/images/ast1.png");
      this.load.image("ast2", "assets/images/ast2.png");

      this.load.image("up", "assets/images/up.png");
      this.load.image("down", "assets/images/down.png");
      this.load.image("space", "assets/images/space.png");
      this.load.image("start", "assets/images/start.png")
      
      this.load.spritesheet("beam", "assets/spritesheets/beam.png", {
        frameWidth: 19,
        frameHeight: 6
      });
      this.load.spritesheet("ship", "assets/spritesheets/ship.png", {
        frameWidth: 29,
        frameHeight: 29
      });
      this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {
        frameWidth: 32,
        frameHeight: 32 
      });
      this.load.spritesheet("button", "assets/spritesheets/button.png", {
        frameWidth: 48,
        frameHeight: 48
      });

      this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.xml");

      this.load.audio("music", "assets/sounds/music.mp3");
    }

    create() {
      this.anims.create({
        key: "shipAnim",
        frames: this.anims.generateFrameNumbers("ship"),
        frameRate: 3,
        repeat: -1
      });

      this.anims.create({
        key:"explode",
        frames: this.anims.generateFrameNumbers("explosion"),
        frameRate: 20,
        repeat: 0
      });

      this.anims.create({
        key: "shootBeam",
        frames: this.anims.generateFrameNumbers("beam"),
        frameRate: 20,
        repeat: -1
      });

      this.anims.create({
        key: "buttonAnim",
        frames: this.anims.generateFrameNumbers("button"),
        frameRate: 5,
        repeat: 0
      });
      
      this.scene.start("MainMenu")
    }
}