var Body = (function(){
  
  var Body = function(game, x, y, radius, mass){
    if(Body.bodyGroup === undefined){
      Body.bodyGroup = game.add.group();
    }
    Phaser.Sprite.call(this, game, x, y, 'Bodies.moon');
    this.scale.setTo(radius/(this.width/2), radius/(this.height/2));
    this.anchor.setTo(0.5, 0.5);
    Body.bodyGroup.add(this);
    this.radius = radius;
    Object.defineProperty(this, "mass", {
      get: function(){return this.body.mass},
      set: function(v){this.body.mass = v}
    });
    Object.defineProperty(this, "velocity", {
      get: function(){return this.body.velocity},
      set: function(v){this.body.velocity = v}
    });
    this.mass = mass || 5;
  }
  
  Body.prototype = Object.create(Phaser.Sprite.prototype);
  Body.prototype.constructor = Body;
  
  Body.prototype.overlaps = function(body){
    var distanceThreshold = this.width / 2 + body.width / 2;
    return this.game.physics.distanceBetween(this, body) < distanceThreshold;
  }
  
  Body.prototype.connectedBodies = function(bodies) {
    var innerFollow = function(body, attached, bodies) {
      for (var i = 0; i < bodies.length; i++) {
        var testBody = bodies[i];
        if (attached.indexOf(testBody) < 0 && body.overlaps(testBody)) {
          attached.push(testBody);
          innerFollow(testBody, attached, bodies);
        }
      }
      return attached;
    }
    return innerFollow(this, [this], bodies);
  }
  
  return Body;
})();