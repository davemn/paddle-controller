(function(exports, $, Time){
  var Smooth = {
    Constant: function(val){
      return function(time){ return val; }
    },
    Linear: function(duration, from, to){
      var startTime = Time.time;
      
      return function(time){
        if(time - startTime > duration){
          return to;
        }
        
        var progress = (time - startTime) / duration;
        return (1-progress)*from + progress*to;
      };
    }
  };
  
  var rawDirections = {
    Horizontal: 0,
    Vertical: 0
  };
  
  var directions = {
    Horizontal: Smooth.Constant(0),
    Vertical: Smooth.Constant(0)
  };
  
  exports.GetAxis = function(axis){
    return directions[axis](Time.time);
  };
  
  exports.GetAxisRaw = function(axis){
    return directions[axis](Number.MAX_SAFE_INTEGER);
  };
  
  var Key = {
    W: 'W'.charCodeAt(0),
    A: 'A'.charCodeAt(0),
    S: 'S'.charCodeAt(0),
    D: 'D'.charCodeAt(0)
  };
  
  var isDown = {};
  isDown[Key.W] = false;
  isDown[Key.A] = false;
  isDown[Key.S] = false;
  isDown[Key.D] = false;
  
  function setIsDown(which, bState){
    if(!which in isDown)
      return;
    isDown[which] = bState;
  }
  
  function interpTo(curInterp, direction){
    var from = curInterp(Time.time);
    var duration, to;

    if(direction > 0){
      if(from < 0){
        duration = -from*1.5;
        to = 0;
      }
      else if(from >= 0){
        duration = (1-from)*1.5;
        to = 1;
      }
    }
    else {
      if(from <= 0){
        duration = (1+from)*1.5;
        to = -1;
      }
      else if(from > 0){
        duration = from*1.5;
        to = 0;
      }
    }
    return Smooth.Linear(duration, from, to);
  }
  
  function interpToZero(curInterp, direction){
    var from = curInterp(Time.time);
    var duration, to;

    if(direction > 0){
      if(from < 0){
        duration = -from*1.5;
        to = 0;
      }
      else
        return null;
    }
    else {
      if(from <= 0)
        return null;
      else if(from > 0){
        duration = from*1.5;
        to = 0;
      }
    }
    return Smooth.Linear(duration, from, to);
  }
  
  $(document).keydown(function(evt){
    if(isDown[evt.which])
      return;
  
    switch(evt.which){
      case Key.W:
        rawDirections.Vertical++;
        directions.Vertical = interpTo(directions.Vertical, +1);
        // Smooth.Blend(directions.Vertical, Smooth.Linear);
        break;
      case Key.A: // 2
        rawDirections.Horizontal--;
        directions.Horizontal = interpTo(directions.Horizontal, -1);
        break;
      case Key.S:
        rawDirections.Vertical--;
        directions.Vertical = interpTo(directions.Vertical, -1);
        break;
      case Key.D: // 1
        rawDirections.Horizontal++;
        directions.Horizontal = interpTo(directions.Horizontal, +1);
        break;
    }
    setIsDown(evt.which, true);
  });
  
  $(document).keyup(function(evt){
    // keyups should never go away from 0
    var interpFunc;
    
    switch(evt.which){
      case 'W'.charCodeAt(0):
        rawDirections.Vertical--;
        // directions.Vertical = interpTo(directions.Vertical, -1);
        interpFunc = interpToZero(directions.Vertical, -1);
        if(interpFunc)
          directions.Vertical = interpFunc;
        break;
      case 'A'.charCodeAt(0): // 4
        rawDirections.Horizontal++;
        interpFunc = interpToZero(directions.Horizontal, +1);
        if(interpFunc)
          directions.Horizontal = interpFunc;
        break;
      case 'S'.charCodeAt(0):
        rawDirections.Vertical++;
        interpFunc = interpToZero(directions.Vertical, +1);
        if(interpFunc)
          directions.Vertical = interpFunc;
        break;
      case 'D'.charCodeAt(0): // 3
        rawDirections.Horizontal--;
        interpFunc = interpToZero(directions.Horizontal, -1);
        if(interpFunc)
          directions.Horizontal = interpFunc;
        break;
    }
    setIsDown(evt.which, false);
  });
})(window.Input = {}, jQuery, Time);