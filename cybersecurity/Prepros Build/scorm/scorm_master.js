

//creating shortcut for less verbose code
var scorm = pipwerks.SCORM;

function init() {

    //Specify SCORM 1.2:
    scorm.version = "1.2";
	console.log("Initializing LMS communication...");
    scorm.init();
}

//Initialize LMS communication
init();

//creating shortcut for less verbose code
var scorm = pipwerks.SCORM;

//Define course variables object
var variables = new Object();

//Define The array that will contain the course variables
var allVariablesArray = new Array();

//Define first and last name variables
var firstName;
var lastName;

function init() {

    //Specify SCORM 1.2:
    scorm.version = "1.2";
    scorm.init();
}


function currentPage() {
    //Generate the page name
    pageName = location.pathname.split("/").slice(-1).toString();
	console.log("The current page is: " + pageName);
    //Update the cmi.corelesson_location SCORM variable
    set('cmi.core.lesson_location', pageName);
}

function lastPageViewed() {
    //Set the last page viewed variable
   lastPageViewed = pageName;
    //Update the suspend data with last page viewed
    updateVariable("lastPageViewed",lastPageViewed)
}

function scoreInitialize() {
    //Check score variable on load
    var initScoreCheck = scorm.get('cmi.core.score.raw');
    //If the score variable is empty, initialize to 0
    if (initScoreCheck == "") {
        updateScore(0);
    }
}


function updateScore(param) {
    var updatedScore = param;
    set('cmi.core.score.raw', updatedScore);
}

function set(param, value) {
    var temp = scorm.set(param, value);
	return temp;

}


function get(param) {
    var value = scorm.get(param);
    return value;
}

function getName() {

    var nameArray = get('cmi.core.student_name').split(",");
    console.log("Getting the student name... the student name is: " + nameArray);

    //Assign values to name variable. **These are the global variables defined at the top of this file, NOT function scope variables
    firstName = nameArray[1];
    lastName = nameArray[0];

}

function complete() {
    console.log("Setting completion status to passed");
    var callSucceeded = scorm.set("cmi.core.lesson_status", "passed");
}

function end() {
console.log("Quitting...");
var callSucceeded = scorm.quit();

}

//This function reads the suspend data, assigns values to the course variables and adds the course variables that aren't already in the suspend data
function readSuspendData(){

console.log("Running readSuspendData() function...");
        
//Get the existing suspend data string
var suspendString = get('cmi.suspend_data');

console.log("Getting the existing suspend data string...It is: " + suspendString);

//split the suspend data string into separate variables
var suspendDataArray = suspendString.split(";");

console.log ("Splitting the suspend data into individual variables: " + suspendDataArray);

//separate each element of suspend data array into variable name and value then write into course variables array

if (suspendDataArray != null && suspendDataArray != ""){
for (i = 0; i < suspendDataArray.length; i++) {
var nameAndValueArray =  suspendDataArray[i].split("=");
console.log("The name and value for this object property are: " + nameAndValueArray);

if (isNaN(nameAndValueArray[1]) || nameAndValueArray[1] == "") {
    var propertyValue = nameAndValueArray[1];
}

else {
propertyValue = parseInt(nameAndValueArray[1]);
}

variables[nameAndValueArray[0]] = propertyValue;

}
}
console.log("The variables object is: " + variables);
console.log("Ended readSuspendData() function");
}

//This function updates the chosen course variable
function updateVariable(name,value) {

console.log("Running updateVariable() function...");


//Update required variable in variables object
variables[name] = value;

console.log("Updating the variables object...the variables object is now: " + variables);

//Call function to update suspend data string with new variable value
writeSuspendData();

console.log("Ended updateVariable() function");

}

//This function updates the course suspend data string with the current values in variables object
function writeSuspendData() {

	console.log("Running writeSuspendData() function...");

   var tempArray = Object.keys(variables);
   var updatedVariablesArray = new Array();

   console.log("The current updated variables array is: " +  updatedVariablesArray);

   for(i = 0; i < tempArray.length; i ++){

   updatedVariablesArray[i] = tempArray[i] + '=' + variables[tempArray[i]];

   console.log("This element of update variables array is: " + updatedVariablesArray[i]);

   }


console.log("The fully updated version of the variables array is: " + updatedVariablesArray);

var updatedSuspendData = updatedVariablesArray.join();

console.log("The updated suspend data string is: " + updatedSuspendData);

for (j = 0; j < updatedVariablesArray.length; j++) {
    updatedSuspendData = updatedSuspendData.replace(",", ";");
}

console.log("The suspend data with semicolons, ready to be pushed back to teh LMS: " + updatedSuspendData);
set('cmi.suspend_data', updatedSuspendData);
var testSuspend = get('cmi.suspend_data');
console.log ("And the suspend data after being pushed back is: " + testSuspend);

console.log("Calling LMScommit function...");
scorm.save();


console.log("Ended writeSuspendData() function");
}






