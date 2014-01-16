
window.onload = (function () {

    var combined = new Combiner(bodies, dragarrow);
  
	game = new Phaser.Game(
	  window.innerWidth, 
	  window.innerHeight, 
	  Phaser.AUTO, 
	  '',
	  combined);


})();