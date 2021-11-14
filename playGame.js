class playGame extends Phaser.Scene {
    constructor() {
      super("PlayGame");
    }

    create() {
      this.bg = this.add.tileSprite(0, 0, config.width, config.height, "bg");
      this.bg.setOrigin(0, 0);

      this.ship = this.add.sprite(config.width, config.height / 2 - 50, "ship");
      this.ast1 = this.add.image(config.width, config.height / 2, "ast1");
      this.ast2 = this.add.image(config.width, config.height / 2 + 50, "ast2");

      this.enemies = this.physics.add.group();
      this.enemies.add(this.ship);
      this.enemies.add(this.ast1);
      this.enemies.add(this.ast2);

      this.ship.play("shipAnim")

      this.physics.world.setBoundsCollision();

      this.player = this.physics.add.image(config.width / 20, config.height / 2, "player");
      this.cursors = this.input.keyboard.createCursorKeys();
      this.player.setCollideWorldBounds(true);

      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      
      this.projectiles = this.add.group();

      this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

      this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

      var graphics = this.add.graphics();
      graphics.fillStyle(0x000000, 1);
      graphics.beginPath();
      graphics.moveTo(0, 0);
      graphics.lineTo(config.width, 0);
      graphics.lineTo(config.width, 20);
      graphics.lineTo(0, 20);
      graphics.lineTo(0, 0);
      graphics.closePath();
      graphics.fillPath();

    this.score = 0;
    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel = this.add.bitmapText(10, 5, "font", "SCORE: " + scoreFormated, 16)

    this.lives = 3;
    var lives = this.lives;
    this.livesLabel = this.add.bitmapText(100, 5, "font", "LIVES: " + lives, 16)
     
    this.music = this.sound.add("music");
     var musicConfig = {
         mute: false,
         volume: 0.3,
         rate: 1.1,
         detune: 0,
         seek: 0,
         loop: true,
         delay: 0
        }
        this.music.play(musicConfig);
    }

    hurtPlayer(player, enemy) {
      this.resetShipPos(enemy);

      if(this.player.alpha < 1) {
        return;
      }

      var explosion = new Explosion(this, player.x, player.y);

      this.lives -= 1;
      var lives = this.lives;
      this.livesLabel.text = "LIVES: " + lives;
      

      player.disableBody(true, true);

      this.time.addEvent({
        delay: 1000,
        callback: this.resetPlayer,
        callbackScope: this,
        loop: false
      });
    }

    resetPlayer() {
      var x = 0;
      var y = config.height / 2;
      this.player.enableBody(true, x, y, true, true);

      this.player.alpha = 0.5;

      var tween = this.tweens.add ({
        targets: this.player,
        x: config.width / 20,
        ease: 'Power1',
        duration: 1500,
        repeat: 0,
        onComplete: function() {
          this.player.alpha = 1;
        },
        callbackScope: this
      });
    }

    hitEnemy(projectile, enemy) {
      var explosion = new Explosion(this, enemy.x, enemy.y);

      projectile.destroy();
      this.resetShipPos(enemy);
      this.score += 10;

      var scoreFormated = this.zeroPad(this.score, 6);
      this.scoreLabel.text = "SCORE: " + scoreFormated;
    }

    zeroPad(number, size) {
      var stringNumber = String(number);
      while(stringNumber.length < (size || 2)) {
        stringNumber = "0" + stringNumber;
      }
      return stringNumber;
    }

    update() {
      var shipSpeed = Phaser.Math.Between(3, 5);
      var astBigSpeed = Phaser.Math.Between(1, 3);
      var astSmallSpeed = Phaser.Math.Between(2, 4);

      this.moveShip(this.ship, shipSpeed);
      this.moveShip(this.ast1, astBigSpeed);
      this.moveShip(this.ast2, astSmallSpeed);

      this.movePlayerManager();

      this.bg.tilePositionX += 0.5;

      if(Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        if(this.player.active) {
          this.shootBeam();
        }
      }
      for (var i = 0; i < this.projectiles.getChildren().length; i++) {
        var beam = this.projectiles.getChildren()[i];
        beam.update();
      }

      if (this.lives == 0) {
        setTimeout(() => {this.scene.start("GameOver");}, 150);
      }
    }

    shootBeam() {
      var beam = new Beam(this);
    }

    movePlayerManager() {
      if (this.cursors.down.isDown && this.player.y <= config.height) {
        this.player.y += 2.5;
      } else if (this.cursors.up.isDown && this.player.y >= 35) {
        this.player.y -= 2.5;
      }
    }

    moveShip(ship, speed) {
      ship.x -= speed;
      if (ship.x < 0) {
        this.resetShipPos(ship);
        this.lives -= 1;
        var lives = this.lives;
        this.livesLabel.text = "LIVES: " + lives;
      }
    }

    resetShipPos(ship) {
      ship.x = config.width;
      var randomY = Phaser.Math.Between(config.height + 25, 25);
      ship.y = randomY;
    }
} 