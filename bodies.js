var bodies = (function() {

  var bodies = [];
  var wasDown = false;
  var startX, startY, endX, endY;
  var radius = 10;
  var G = 500000;
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
    var sprite = new Body(game, position.x, position.y, radius, totalMass);
    var vel = totalMomentum.divide(totalMass, totalMass);
    sprite.velocity = vel;
    bodies.push(sprite);
  }

  return {

    preload: function(){
        game.load.image('Bodies.moon', 'moon.png', true);  
    },
      
    update: function() {
      if (game.input.activePointer.isDown && !wasDown) {
        startX = endX = game.input.activePointer.worldX;
        startY = endY = game.input.activePointer.worldY;
        body = new Body(game, startX, startY, radius);
        wasDown = true;
      } else if (!game.input.activePointer.isDown && wasDown) {
        wasDown = false;
        bodies.push(body);
        body.velocity.setTo(endX - startX, endY - startY);
      } else if (game.input.activePointer.isDown && wasDown) {
        endX = game.input.activePointer.worldX;
        endY = game.input.activePointer.worldY;
      }

      var seen = [];
      var attached = [];
      for (var i = 0; i < bodies.length; i++) {
        var body1 = bodies[i];
        for (var j = i + 1; j < bodies.length; j++) {
          var body2 = bodies[j];
          var distance = game.physics.distanceBetween(body1, body2);
          var force = G * (((body1.mass) * (body2.mass)) / (distance * distance));
          game.physics.accelerateToObject(body1, body2, force / (body1.mass));
          game.physics.accelerateToObject(body2, body1, force / (body2.mass));
        }
        
        if(seen.indexOf(body1) < 0){
          var bodyGroup = body1.connectedBodies(bodies);
          attached.push(bodyGroup);
          seen = seen.concat(bodyGroup);
        }
      }

      for (i = 0; i < attached.length; i++) {
        combine(attached[i]);
      }
    }
  };
})()