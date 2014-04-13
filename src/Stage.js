Action.Stage = function(){

  var superClass = PIXI.Stage;
  var Stage = function(color){
    superClass.call(this, color || 0x000000, true);

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = PIXI.autoDetectRenderer(this.width, this.height, null);

    document.body.appendChild(this.renderer.view);
    this.renderer.view.style.position = "absolute";
    this.renderer.view.style.top = "0px";
    this.renderer.view.style.left = "0px";

    this.lastTime = 0;
    
    function animate(timestamp) {
      requestAnimFrame(animate.bind(this));

      var diff = timestamp - this.lastTime;
      for(var i = 0; i < this.updateables.length; i++){
        this.updateables[i].update(diff);
      }

      this.lastTime = timestamp;
      this.renderer.render(this);
    }

    requestAnimFrame(animate.bind(this));
  };

  Stage.prototype = Object.create(superClass.prototype);
  Stage.prototype.constructor = Stage;

  Stage.prototype.updateables = [];

  Stage.prototype.addChildAt = function(child, index){
    if(child.update){
      this.updateables.splice(index, 0, child);
    }
    if(child instanceof PIXI.DisplayObject){
      superClass.prototype.addChildAt.call(this, child, index);
    }
  };
  
  return Stage;
}();
