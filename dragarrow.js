var DragArrow = (function () {
  var line;
  var nubLength = 7;
  var angle = 45 * Math.PI / 180;
  
  function DragArrow(){
  }
  
  
  DragArrow.prototype = {
    
    create : function(){
      line = this.game.add.graphics(0, 0);
    },
    
    update: function(){
      this.clearLine();
      if(this.game.input.activePointer.isDown){
        var pointer = this.game.input.activePointer;
        this.setLine(pointer.positionDown.x, pointer.positionDown.y, pointer.worldX, pointer.worldY);
      }
    },
    
    setLine : function(startX, startY, endX, endY){
      line.clear();
      line.lineStyle(2, 0xFFFFFF);
      line.moveTo(startX, startY);
      line.lineTo(endX, endY); 
      
      var baseAngle = Math.atan2(endY - startY, endX - startX);
      var newX = endX - nubLength * Math.cos(baseAngle + angle);
      var newY = endY - nubLength * Math.sin(baseAngle + angle);
      line.lineTo(newX, newY);
      line.moveTo(endX, endY);
      
      newX = endX - nubLength * Math.cos(baseAngle - angle);
      newY = endY - nubLength * Math.sin(baseAngle - angle);
      line.lineTo(newX, newY);
    },
    
    clearLine: function(){
      line.clear();
    }
  };
  
  DragArrow.prototype.constructor = DragArrow;
  
  return DragArrow;
  
})();