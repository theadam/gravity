
window.onload = (function () {
  
  var bodies = new Bodies();
  var dragArrow = new DragArrow();
  var combined = new Combiner(bodies, dragArrow);
  combined.watchProperties('game');
  
  var game = new Phaser.Game(
    window.innerWidth, 
    window.innerHeight, 
    Phaser.AUTO, 
    '',
    combined);
  
})();