// Vector2 is immutable. It's meant to match Unity's Vector2 class.
// Differs from Unity in that most methods are instance methods, and 
// not static methods.
function Vector2(x, y){
  this.x = $.isNumeric(x) ? parseFloat(x) : 0;
  this.y = $.isNumeric(x) ? parseFloat(y) : 0;
}
Vector2.up = new Vector2(0,1);
Vector2.right = new Vector2(1,0);
Vector2.zero = new Vector2(0,0);

// - Class / static methods ---

Vector2.Add = function(a, b){
  return new Vector2(a.x+b.x, a.y+b.y);
};
Vector2.Subtract = function(a, b){
  return new Vector2(a.x-b.x, a.y-b.y);
};
Vector2.Scale = function(a, b){
  if(b instanceof Vector2)
    return new Vector2(a.x*b.x, a.y*b.y);
  else {
    if(!$.isNumeric(b))
      throw new Error('Non-scalar argument provided');
    return new Vector2(a.x*b, a.y*b);
  }
};
Vector2.Negate = function(a){
  return new Vector2(-a.x, -a.y);
};
Vector2.prototype.Angle = function(a, b){
  var rads = Math.acos(Vector2.Dot(a.normalized(), b.normalized()));
  return 180*rads/Math.PI;
};
Vector2.prototype.Distance = function(a, b){
  return Vector2.Subtract(a, b).magnitude();
};
Vector2.prototype.Dot = function(a, b){
  return a.x*b.x + a.y*b.y;
};
Vector2.prototype.Lerp = function(a, b, t){
  t = Math.max(t, 0);
  t = Math.min(t, 1);
  
  var heading = Vector2.Subtract(b, a);
  heading = Vector2.Scale(heading, t);
  
  return Vector2.Add(a, heading);
};

// - Instance methods (replacement for C#'s static variables) ---

Vector2.prototype.normalized = function(){
  var mag = this.magnitude();
  if(mag == 0)
    return Vector2.zero;
  return new Vector2(this.x/mag, this.y/mag);
};
Vector2.prototype.magnitude = function(){
  return Math.sqrt(this.x*this.x + this.y*this.y);
};
Vector2.prototype.toString = function(){
  return '[' + this.x + ',' + this.y + ']';
};