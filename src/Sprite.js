Action.Sprite = function(texture){
  if(Action.Sprite.cache[texture]){
    texture = Action.Sprite.cache[texture];
  }

  else if(Object.prototype.toString.call(texture) == "[object String]"){
    Action.Sprite.cache[texture] = PIXI.Texture.fromImage(texture);
    texture = Action.Sprite.cache[texture];
  }
  
  PIXI.Sprite.call(this, texture);
};

Action.Sprite.prototype = Object.create(PIXI.Sprite.prototype);
Action.Sprite.prototype.constructor = Action.Sprite;

Action.Sprite.cache = {};