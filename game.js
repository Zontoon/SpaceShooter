var config = {
  type: Phaser.CANVAS,
  width: window.innerWidth * window.devicePixelRatio / 2,
  height: 250,
  scene: [preloadGame, mainMenu, playGame, gameOver],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade:{
        debug: false
    }
  }
}

var game = new Phaser.Game(config);