(function(exports, $){
  exports.instance = function(opts){
    this.canvas = $(opts.canvasSelector).get(0);
    this.ctx = this.canvas.getContext('2d');
    
    this.phase = opts.phase;
    this.freq = opts.frequency;
    
    this.pos = new Vector2(-10, 0);
  };
  
  exports.instance.prototype.updateAndDraw = function(){
    this.pos.y = 32 * Math.sin(2*Math.PI*this.freq*Time.time + this.phase);
    
    this.ctx.save();
    this.ctx.fillStyle = 'blue';
    this.ctx.translate(this.canvas.halfWidth, this.canvas.halfHeight);
    this.ctx.scale(1, -1);
    
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, 8, 0, 2*Math.PI);
    this.ctx.fill();
    
    this.ctx.restore();
  };
})(window.Wave = {}, jQuery, Time);