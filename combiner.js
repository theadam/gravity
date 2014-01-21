var Combiner = (function(){
  
  var instanceList = [];
  var properties = {};
  var instanceFunction = function(member){
    return function(){
      for(var i = 0; i < this[member].list.length; i++){
        var currentInstance = this[member].list[i];
        var ret = currentInstance[member].apply(currentInstance, arguments);
        if(ret === false){
          break;
        }
      }
    }
  }
  
  function Combiner(){
    for(var i = 0; i < arguments.length; i++){
      
      var instance = arguments[i];
      instanceList.push(instance)

      for(var member in instance){
        if(instance[member] instanceof Function){
          
          if(this[member] === undefined){
            this[member] = instanceFunction(member);
            this[member].list = [];
          }
          if(this[member].list !== undefined){
            this[member].list.push(instance);
          }
        }
      }
    }
  }
  
  Combiner.prototype.watchProperties = function(){
    for(var i = 0; i < arguments.length; i++){
      var property = arguments[i];
      if(!this.hasOwnProperty(property)){
        Object.defineProperty(this, property, {
          get: function(){
            return properties[property];
          },
          set: function(val){
            properties[property] = val;
            for(var j = 0; j < instanceList.length; j++){
              instanceList[j][property] = val;
            }
          }
        });
      }
    }
  }
  
  return Combiner;
  
})();