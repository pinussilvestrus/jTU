angular.module("downloadService", [])

	.factory("Download", function($http, $q, $location, $anchorScroll, $sce){
    var _download = {};

    _download.downloadModel = function() {
      html2canvas(document.body, 
        {
          onrendered: function (canvas) {
            var a = document.createElement('a');
            // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
            a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            a.download = 'somefilename.jpg';
            a.click();
          }
        });
    };

		return _download;
	});
