//here is your code...
summerready = function () {


};
function openBattery(){
	summer.batterystatus(function(status){
        alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
    });
}