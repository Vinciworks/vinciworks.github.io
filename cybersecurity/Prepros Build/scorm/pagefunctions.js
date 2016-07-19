

// Run page functions on page load

var iframeLocation = location.pathname.split("/").slice(-1).toString();

if (iframeLocation != 'courselaunch.html') {
    parent.currentPage(iframeLocation);
    parent.readSuspendData();
}

else {
    parent.readSuspendData();
}


//Set Last Page variable on page unload
    window.onbeforeunload = function () {
        
		if (iframeLocation != 'courselaunch.html'){ 
		parent.updateVariable('lastPageViewed', iframeLocation);
		}
    }

    window.onunload = function () {
        
		if (iframeLocation != 'courselaunch.html'){ 
		parent.updateVariable('lastPageViewed', iframeLocation);
		}
    }
