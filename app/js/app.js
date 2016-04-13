angular.module("mainApp", [
  'app.routes',
  'ui.materialize',
  'mainController',
  'converterService',
  'drawerService',
  'umlClassDirective'
])

document.onmousemove = function(e)
{
    var x = e.pageX;
    var y = e.pageY;
    if (y > 700);
    //console.log(y);
};
