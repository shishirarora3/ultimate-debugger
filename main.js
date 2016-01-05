window.wind = 'hey2';

var fn = function(a){
var that = this;
var c =12;


return function(){
  var b = 10;
  c++;
  that.wind = 'hey';
  this.c = c;
  this.log();
};

};
fn = fn(3);

//invocation
fn();
fn();


 function log(){
  var that = this;
  console.log({
    that: that,
    this: this,
    that_c:that.c,
    this_c: this.c,
    that_a: that.a,
    equalityTriple: that === this,
    equality: that == this,
    that_wind: that.wind,
    window_window: window.window,
    self: self,
    status: status,
    parent:parent,
    screen_width:screen.width,
    screen_colorDepth: screen.colorDepth,
    screen_availWidth: screen.availWidth,
    screenLeft:screenLeft
  });
}








