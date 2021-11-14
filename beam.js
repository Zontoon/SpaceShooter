class Beam extends Phaser.GameObjects.Sprite{
  constructor(scene){

    var x = scene.player.x + 20;
    var y = scene.player.y;

    super(scene, x, y, "beam");

    scene.add.existing(this);

    this.play("shootBeam")
    scene.physics.world.enableBody(this);
    this.body.velocity.x = + 250;

    scene.projectiles.add(this);
  }


  update(){
    if(this.x <= 0){
      this.destroy();
    }
  }
}
