angular.module("drawerService", [])

	.factory("Drawer", function($http, $q, $location, $anchorScroll, $sce){

    var drawer = {};

		//helper functions, it turned out chrome doesn't support Math.sgn()
		var _signum = function(x) {
		    return (x < 0) ? -1 : 1;
		};

		var _absolute = function(x) {
		    return (x < 0) ? -x : x;
		};

		var _drawPath = function(svg, path, startX, startY, endX, endY, caption) {
		    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
		    var stroke =  parseFloat(path.attr("stroke-width"));
		    // check if the svg is big enough to draw the path, if not, set heigh/width
		    if (svg.attr("height") <  endY)                 svg.attr("height", endY);
		    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke + caption.outerWidth() + 10));
		    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke + caption.outerWidth() + 10));

		    var deltaX = (endX - startX) * 0.15;
		    var deltaY = (endY - startY) * 0.15;
		    // for further calculations which ever is the shortest distance
		    var delta  =  deltaY < _absolute(deltaX) ? deltaY : _absolute(deltaX);

		    // set sweep-flag (counter/clock-wise)
		    // if start element is closer to the left edge,
		    // draw the first arc counter-clockwise, and the second one clock-wise
		    var arc1 = 0; var arc2 = 1;
		    if (startX > endX) {
		        arc1 = 1;
		        arc2 = 0;
		    }
		    // draw tha pipe-like path
		    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
		    path.attr("d",  "M"  + startX + " " + startY +
		                    " V" + (startY + delta) +
		                    " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*_signum(deltaX)) + " " + (startY + 2*delta) +
		                    " H" + (endX - delta*_signum(deltaX)) +
		                    " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
		                    " V" + endY );
		};

		_setCaption = function(caption, endX, endY) {
			var captionPositionX = endX - caption.outerWidth() -  10;
			var captionPositionY = endY - 5;

			caption.attr("x", captionPositionX);
			caption.attr("y", captionPositionY);
		};

		_setMultiplicities = function(coordinates, upperMultiplicity, lowerMultiplicity, multiplicityType) {
			switch (multiplicityType) {
				case '1:1':
					upperMultiplicity.text('1');
					lowerMultiplicity.text('1');
					break;
				case '1:n':
					upperMultiplicity.text('1');
					lowerMultiplicity.text('n');
				case 'm:n':
					upperMultiplicity.text('m');
					lowerMultiplicity.text('n');
					break;
				default:
					break;
			}

			var upperX = coordinates.startX;

			if (coordinates.endX > coordinates.startX) {
				upperX += 5;
			} else {
				upperX -= 10;
			}

			var upperY = coordinates.startY + 13;
			var lowerX = coordinates.endX + 5;
			var lowerY = coordinates.endY - 5;

			upperMultiplicity.attr("x", upperX);
			upperMultiplicity.attr("y", upperY);
			lowerMultiplicity.attr("x", lowerX);
			lowerMultiplicity.attr("y", lowerY);
		};

		drawer.connectElements = function(svg, path, startElem, endElem, container, caption, upperMultiplicity, lowerMultiplicity, multiplicityType) {
		    var _container = container || "#svgContainer";
		    var svgContainer= $(_container);

		    // if first element is lower than the second, swap!
		    if(startElem.offset().top > endElem.offset().top){
		        var temp = startElem;
		        startElem = endElem;
		        endElem = temp;
		    }

		    // get (top, left) corner coordinates of the svg container
		    var svgTop  = svgContainer.offset().top;
		    var svgLeft = svgContainer.offset().left;

		    // get (top, left) coordinates for the two elements
		    var startCoord = startElem.offset();
		    var endCoord   = endElem.offset();

		    // calculate path's start (x,y)  coords
		    // we want the x coordinate to visually result in the element's mid point
		    var startX = startCoord.left + 0.5*startElem.outerWidth();   // x = left offset + 0.5*width - svg's left offset
		    var startY = startCoord.top + startElem.outerHeight();       // y = top offset + height - svg's top offset

		    // calculate path's end (x,y) coords
		    var endX = endCoord.left + 0.5*endElem.outerWidth();
		    var endY = endCoord.top;

		    // call function for drawing the path
		    _drawPath(svg, path, startX, startY, endX, endY, caption);

				_setCaption(caption, endX, endY);
				_setMultiplicities({
					startX: startX,
					startY: startY,
					endX: endX,
					endY: endY
				}, upperMultiplicity, lowerMultiplicity, multiplicityType);
		};

		/**

		$(window).resize(function () {
		    // reset svg each time
		    $("#svg1").attr("height", "0");
		    $("#svg1").attr("width", "0");
		    connectAll();
		});**/

    return drawer;

  });
