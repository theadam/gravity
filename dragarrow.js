var dragarrow = (function(){
  
  var line;
  var isDragging = false, startX, endX, startY, endY;
  var nubLength = 7;
  var angle = 45 * Math.PI / 180;

  return {
    
    create : function(){
      line = game.add.graphics(0, 0);
    },
    
    update : function(){
      if(game.input.activePointer.isDown){
        if(!isDragging){
          isDragging = true;
          startX = game.input.activePointer.x;
          startY = game.input.activePointer.y;
        }
        endX = game.input.activePointer.x;
        endY = game.input.activePointer.y;
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

      }
      else if(isDragging){
        isDragging = false;
        line.clear();
      }
    }
  };
  
})();