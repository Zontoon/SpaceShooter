class gameOver extends Phaser.Scene {
    constructor() {
      super("GameOver");
    }

    create() {
      this.bg = this.add.tileSprite(0, 0, config.width, config.height, "bg");
      this.bg.setOrigin(0, 0);

      this.sad = this.add.bitmapText(config.width - 600, config.height - 200, "font", "GAME OVER", 64);

      this.button = this.add.sprite(config.width / 2, config.height / 2, "button");

      this.button.setInteractive();

      this.input.on('gameobjectdown', this.pressButton, this);
    }

    pressButton(pointer, gameObject) {
      gameObject.play("buttonAnim");
      setTimeout(() => {this.scene.start("PlayGame");}, 1000);
    }
}