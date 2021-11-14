class mainMenu extends Phaser.Scene {
    constructor() {
      super("MainMenu");
    }

    create() {
      this.bg = this.add.tileSprite(0, 0, config.width, config.height, "bg");
      this.bg.setOrigin(0, 0);

      this.movement = this.add.bitmapText(100, 15, "font", "MOVEMENT", 48);
      this.shoot = this.add.bitmapText(125, 120, "font", "SHOOT", 48);
      
      this.up = this.add.image(150, 75, "up");
      this.down = this.add.image(225, 75, "down");
      this.space = this.add.image(175, 180, "space");
      this.start = this.add.image(config.width - 300, 125, "start")

      this.up.setScale(2);
      this.down.setScale(2);
      this.space.setScale(2);
      this.start.setScale(4);

      this.start.setInteractive();

      this.input.on('gameobjectdown', this.pressStart, this);
    }

    pressStart(pointer, gameObject) {
      this.scene.start("PlayGame");
    }
}