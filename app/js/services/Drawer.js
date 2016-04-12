angular.module("drawerService", [])

	.factory("Drawer", function($http, $q, $location, $anchorScroll, $sce){

    var drawer = {};

    var getOffset = function( el ) {
      var rect = el.getBoundingClientRect();
      return {
          left: rect.left + window.pageXOffset,
          top: rect.top + window.pageYOffset,
          width: rect.width || el.offsetWidth,
          height: rect.height || el.offsetHeight
      };
    };

    drawer.drawLine = function(div1, div2, color, thickness) {
        var off1 = getOffset(div1);
        var off2 = getOffset(div2);
        // center
        var x1 = off1.left + off1.width / 2;
        var y1 = off1.top + off1.height;

        var x2 = off2.left + off2.width / 2;
        var y2 = off2.top;
        // distance
        var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
        // center
        var cx = ((x1 + x2) / 2) - (length / 2);
        var cy = ((y1 + y2) / 2) - (thickness / 2);
        // angle
        var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
        // make hr
        var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";

        document.body.innerHTML += htmlLine;
    };
    return drawer;

  });
