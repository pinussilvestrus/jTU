angular.module("mainApp", [
  'app.routes',
  'ui.materialize',
  'mainController',
  'converterService',
  'drawerService',
  'downloadService',
  'umlClassDirective',
  'associationDirective'
])

document.onmousemove = function(e)
{
    var x = e.pageX;
    var y = e.pageY;
    if (y > 700);
    //console.log(y);
};
