//here is your code...
summerready = function () {


};
function openBattery(){
    window.addEventListener("batterystatus", onBatteryStatus, false);

    function onBatteryStatus(status) {
        $summer.alert(status);
        alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
    }
}