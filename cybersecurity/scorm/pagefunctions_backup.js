

// Run functions on page load

//parent.getName();

var pageName;
var lastPageViewed;

function currentPage() {
    //Generate the page name
    pageName = location.pathname.split("/").slice(-1).toString();
    console.log("The current page is: " + pageName);
    //Update the cmi.corelesson_location SCORM variable
    parent.set('cmi.core.lesson_location', pageName);
    return pageName;
}

function lastPageViewed() {
    //Set the last page viewed variable
    lastPageViewed = pageName;
    //Update the suspend data with last page viewed
    parent.updateVariable("lastPageViewed", lastPageViewed)
}

currentPage();
parent.readSuspendData();
lastPageViewed();



