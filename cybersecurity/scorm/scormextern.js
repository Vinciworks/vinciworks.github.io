
//Define course variables object
var isHosted = 0;

//Set scorm variables on non-hosted courses. Function is only called (from the 'scormvar.js' file) if isHosted is set to 1.

function scormVariables() {

   parent.updateVariable('Var_firm_name', 'ABC');
   parent.updateVariable('Varpassmark', 50);
   parent.updateVariable('Var_courseid', 58);
   parent.updateVariable('Var_PDFAtLaunch', 'True');
   parent.scorm.save();
}

function licenseCheck() {

var status = license_function(parent.variables.Var_firm_name, parent.variables.Var_courseid);
return status;

}


