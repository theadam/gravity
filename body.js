var Body = (function(){
  
  var Trail = function(game, x, y, radius){
    Phaser.Sprite.call(this, game, x, y, Body.trailTexture);
    this.init(x, y, radius);
    this.anchor.setTo(0.5, 0.5);
    Body.trailGroup.add(this);
  }
  
  Trail.prototype = Object.create(Phaser.Sprite.prototype);
  Trail.prototype.constructor = Trail;
  
  Trail.prototype.init = function(x, y, radius){
    this.x = x;
    this.y = y;
    this.alpha = 0.9;
    this.height = this.width = radius * 2 * 0.9;
  }
  
  Trail.prototype.preUpdate = function(){
    Phaser.Sprite.prototype.preUpdate.call(this);
    if(this.alpha <= 0){
      this.kill();
      return;
    }
    this.alpha -= 0.02;
    this.width *= 0.93;
    this.height *= 0.93;
  }
  
  var Body = function(game, x, y, radius, mass){
    if(Body.trailGroup === undefined){
      Body.trailGroup = game.add.group();
    }
    if(Body.bodyGroup === undefined){
      Body.bodyGroup = game.add.group();
    }
    if(Body.trailTexture === undefined){
      Body.trailTexture = game.add.bitmapData(1000,1000);
      Body.trailTexture.beginFill('#FFFFFF');
      Body.trailTexture.circle(500,500,498);
      Body.trailTexture.fill();
    }
    Phaser.Sprite.call(this, game, x, y, 'Bodies.texture');
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(radius/(this.width/2), radius/(this.height/2));
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
    this.mass = mass || 5000000;
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
  
  var trail = [];
  
  Body.prototype.preUpdate = function(){
    Phaser.Sprite.prototype.preUpdate.call(this);
    if(!this.velocity.isZero()){
      if(trail.length > 0 && !trail[0].alive){
        var dead = trail.splice(0,1)[0];
        dead.revive();
        dead.init(this.x, this.y, this.radius);
        trail.push(dead);
      }
      else{
        trail.push(new Trail(this.game, this.x, this.y, this.radius));
      }
    }
  }
  
  return Body;
})();