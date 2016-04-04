(function(exports, $, Vector2, Input){
  exports.instance = function(opts){
    this.canvas = $(opts.canvasSelector).get(0);
    this.ctx = this.canvas.getContext('2d');
  };
  
  exports.instance.prototype._drawAxes = function(){
    var isAdjust = (this.ctx.lineWidth%2 == 1);
    var hAdjust, wAdjust;
    
    if(isAdjust){
      hAdjust = (this.canvas.width%2 == 0 ? 0.5 : 0);
      wAdjust = (this.canvas.width%2 == 0 ? 0.5 : 0);
    }
    else {
      hAdjust = (this.canvas.width%2 == 0 ? 0 : 0.5);
      wAdjust = (this.canvas.width%2 == 0 ? 0 : 0.5);
    }
      
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.halfWidth+wAdjust, hAdjust);
    this.ctx.lineTo(this.canvas.halfWidth+wAdjust, this.canvas.height+hAdjust);
    this.ctx.stroke();
    
    this.ctx.beginPath();
    this.ctx.moveTo(wAdjust, this.canvas.halfHeight+hAdjust);
    this.ctx.lineTo(this.canvas.width+wAdjust, this.canvas.halfHeight+hAdjust);
    this.ctx.stroke();
  };
  
  exports.instance.prototype._drawCursor = function(){
    var cursorPos = new Vector2(Input.GetAxis('Horizontal'), Input.GetAxis('Vertical'));
    cursorPos = Vector2.Scale(cursorPos, Math.min(this.canvas.halfWidth, this.canvas.halfHeight));
    
    this.ctx.save();
    this.ctx.translate(this.canvas.halfWidth, this.canvas.halfHeight);
    this.ctx.scale(1, -1);
    
    this.ctx.beginPath();
    this.ctx.arc(cursorPos.x, cursorPos.y, 8, 0, 2*Math.PI);
    this.ctx.fill();
    
    this.ctx.restore();
  };
  
  var paddle, paddleStart = Vector2.up;
  var engageStart, engageAngle, engageThreshold = 0.4;
  var isEngaged = false;
  
  exports.instance.prototype._drawEngageCircle = function(){
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(
      this.canvas.halfWidth, this.canvas.halfHeight,
      engageThreshold * Math.min(this.canvas.halfWidth, this.canvas.halfHeight),
      0, 2*Math.PI);
    this.ctx.stroke();
    this.ctx.restore();
  };
  
  exports.instance.prototype._drawPaddle = function(){
    var cursorPos = new Vector2(Input.GetAxis('Horizontal'), Input.GetAxis('Vertical'));
    paddle = paddleStart;
    
    if(cursorPos.magnitude() >= engageThreshold){
      if(!isEngaged){
        isEngaged = true;
        engageStart = cursorPos;
      }
      
      engageAngle = Math.atan2(cursorPos.y, cursorPos.x) - Math.atan2(engageStart.y, engageStart.x);
      paddle = Vector2.Rotate(paddle, engageAngle * 180 / Math.PI);
    }
    else {
      if(isEngaged){
        paddleStart = Vector2.Rotate(paddle, engageAngle * 180 / Math.PI);
        paddle = paddleStart;
      }
      isEngaged = false;
    }
    
    this.ctx.save();
    this.ctx.translate(this.canvas.halfWidth, this.canvas.halfHeight);
    this.ctx.scale(1, -1);
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'blue';
    this.ctx.moveTo(0, 0);
    var paddleIndicator = Vector2.Scale(paddle, this.canvas.halfWidth);
    this.ctx.lineTo(paddleIndicator.x, paddleIndicator.y);
    this.ctx.stroke();
    this.ctx.restore();
  };
  
  exports.instance.prototype.updateAndDraw = function(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'red';
    
    // Axes
    this._drawAxes();
    
    // Cursor
    this._drawCursor();
    
    // Circle of Engagement
    this._drawEngageCircle();
    this._drawPaddle();
  };
})(window.InputViz = {}, jQuery, Vector2, Input);