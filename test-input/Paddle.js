(function(exports, $, Time, Vector2, Input){
  var paddle, paddleStart = Vector2.up, paddleAngle = 0;
  var engageStart, engageAngle;
  var isEngaged = false;
  
  exports.engageThreshold = 0.4;
  
  exports.GetAngle = function(){
    return paddleAngle;
  };
  
  exports.GetDirection = function(){
    return paddle;
  };
  
  // ---
  
  function step(){
    var cursorPos = new Vector2(Input.GetAxis('Horizontal'), Input.GetAxis('Vertical'));
    paddle = paddleStart;
    
    if(cursorPos.magnitude() >= exports.engageThreshold){
      if(!isEngaged){
        isEngaged = true;
        engageStart = cursorPos;
      }
      
      engageAngle = Math.atan2(cursorPos.y, cursorPos.x) - Math.atan2(engageStart.y, engageStart.x);
      paddle = Vector2.Rotate(paddle, engageAngle * 180 / Math.PI);
      paddleAngle += engageAngle;
    }
    else {
      if(isEngaged){
        paddleStart = Vector2.Rotate(paddle, engageAngle * 180 / Math.PI);
        paddle = paddleStart;
        paddleAngle += engageAngle;
      }
      isEngaged = false;
    }
    
    requestAnimationFrame(step);
  }
  
  requestAnimationFrame(step);
  
})(window.Paddle = {}, jQuery, Time, Vector2, Input);