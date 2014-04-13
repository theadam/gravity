var Moon = function(x, y){
  
  Action.Sprite.call(this, "moon.png");

  this.anchor.x = 0.5;
  this.anchor.y = 0.5;

  this.width = 50;
  this.height = 50;

  this.position.x = x || 0;
  this.position.y = y || 0;

  this.velocity = new PIXI.Point();
  this.velocity.x = Math.random();
  this.velocity.y = Math.random();

};

Moon.prototype = Object.create(Action.Sprite.prototype);
Moon.prototype.constructor = Moon;

Moon.prototype.update = function(timestamp){
  this.position.x += timestamp * this.velocity.x;
  this.position.y += timestamp * this.velocity.y;
  if(this.position.x + this.width > this.parent.width || this.position.x < 0){
    this.velocity.x = -this.velocity.x;
  }
  if(this.position.y + this.height > this.parent.height || this.position.y < 0){
    this.velocity.y = -this.velocity.y;
  }  
};