var stage = new Action.Stage();
stage.addChild(new Moon());

stage.mousedown = stage.tap = function(){
  stage.addChild(new Moon());
};
