var Combiner = function(){
  
  var instanceFunction = function(member){
    return function(){
      for(var i = 0; i < this[member].list.length; i++){
        var currentInstance = this[member].list[i];
        currentInstance[member].apply(currentInstance, arguments);
      }
    }
  }
  
  for(var i = 0; i < arguments.length; i++){
    
    var instance = arguments[i];

    for(var member in instance){
      if(instance[member] instanceof Function){
        
        if(this[member] === undefined){
          this[member] = instanceFunction(member);
          this[member].list = [];
        }
        
        this[member].list.push(instance);
        
      }
    }
    
  }
  
};