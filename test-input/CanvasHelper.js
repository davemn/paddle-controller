(function(exports, $){
  exports.setup = function(canvasElemSel, aspect){
    var canvas = $(canvasElemSel).get(0);
    var ctx = canvas.getContext('2d');
    
    var canvasAspect = (aspect || 1); // e.g. 16/10
    
    var width = $(canvas).parent('.canvas-container').width();
    var height = width / canvasAspect;
    
    // Don't set canvas size using CSS properties! Will result in pixel scaling instead of viewport scaling.
    // http://stackoverflow.com/a/331462
    
    canvas.width  = width;
    canvas.height = height;
    
    canvas.halfWidth = width/2;
    canvas.halfHeight = height/2;
    
    $(window).resize(createResizeListener(canvas, canvasAspect));
  };
  
  function createResizeListener(canvas, canvasAspect){
    return function(evt){
      var canvasAspect = (aspect || 1); // e.g. 16/10
      
      var width = $(canvas).parent('.canvas-container').width();
      var height = width / canvasAspect;
      
      // Don't set canvas size using CSS properties! Will result in pixel scaling instead of viewport scaling.
      // http://stackoverflow.com/a/331462
      
      canvas.width  = width;
      canvas.height = height;
      
      canvas.halfWidth = width/2;
      canvas.halfHeight = height/2;
    };
  }
})(window.CanvasHelper = {}, jQuery);