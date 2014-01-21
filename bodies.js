var Bodies = (function () {
  
  function Bodies(){};
  
  var bodies = [];
  var wasDown = false;
  var startX, startY, endX, endY;
  var radius = 10;
  var G = 0.1;
  var bounce = 0.5;
  var textures = {};
  var didOverlap = false;
  var bodyGroup;
  
  var combine = function(toCombine) {
    if(toCombine.length < 2){
      return;
    }
    var totalVol = 0;
    var totalPoint = new Phaser.Point(0, 0);
    var totalMass = 0;
    var totalMomentum = new Phaser.Point(0, 0);
    
    for (var i = 0; i < toCombine.length; i++) {
      var body = toCombine[i];
      bodies.splice(bodies.indexOf(body), 1);
      totalVol += Math.pow(Math.PI * body.width / 2, 2);
      totalPoint.add(body.x * body.body.mass, body.y * body.body.mass);
      totalMass += body.body.mass;
      var momentum = body.body.velocity.multiply(body.body.mass, body.body.mass);
      totalMomentum.add(momentum.x, momentum.y);
      body.destroy();
    }
    var position = totalPoint.divide(totalMass, totalMass);
    var radius = Math.sqrt(totalVol) / Math.PI;
    var sprite = new Body(this.game, position.x, position.y, radius, totalMass);
    var vel = totalMomentum.divide(totalMass, totalMass);
    sprite.velocity = vel;
    bodies.push(sprite);
  };
  
  Bodies.prototype =  {
    
    preload: function(){
      this.game.load.image('Bodies.texture', 'moon.png', true);  
      this.game.world.setBounds(-Infinity, -Infinity, Infinity, Infinity);
    },
    
    create: function(){
      
    },
    
    update: function() {

      var activePointer = this.game.input.activePointer;
      if (activePointer.isDown && !wasDown) {
        body = new Body(this.game, activePointer.positionDown.x, activePointer.positionDown.y, radius);
        wasDown = true;
      } 
      else if(this.game.input.activePointer.isUp && wasDown){
        wasDown = false;
        bodies.push(body);
        body.velocity.setTo(activePointer.x - activePointer.positionDown.x, activePointer.y - activePointer.positionDown.y);
      }
      
      if(this.game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT)){
        var currentFocus = this.game.camera.target;
        if(bodies.indexOf(currentFocus) == -1 && bodies.length > 0){
          this.game.camera.follow(bodies[0]);
        }
        else if(bodies.indexOf(currentFocus) > -1){
          var index = bodies.indexOf(currentFocus);
          index += 1;
          if(index == bodies.length){
            this.game.camera.follow(null);
          }
          else{
            this.game.camera.follow(bodies[index]);
          }
        }
      }
      
      var seen = [];
      var attached = [];
      for (var i = 0; i < bodies.length; i++) {
        var body1 = bodies[i];
        for (var j = i + 1; j < bodies.length; j++) {
          var body2 = bodies[j];
          var distance = this.game.physics.distanceBetween(body1, body2);
          var force = G * (((body1.mass) * (body2.mass)) / (distance * distance));
          this.game.physics.accelerateToObject(body1, body2, force / (body1.mass));
          this.game.physics.accelerateToObject(body2, body1, force / (body2.mass));
        }
        
        if(seen.indexOf(body1) < 0){
          var bodyGroup = body1.connectedBodies(bodies);
          attached.push(bodyGroup);
          seen = seen.concat(bodyGroup);
        }
      }
      
      for (i = 0; i < attached.length; i++) {
        combine.call(this, attached[i]);
      }
    }
  };
  Bodies.prototype.constructor = Bodies;
  return Bodies;
})();