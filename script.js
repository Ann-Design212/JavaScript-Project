// This will store all alarms the user sets

let alarms= [];

// Load alarms from localStorage on page load
function loadAlarmsFromStorage(){
    const stored = localStorage.getItem("alarms");
    if (stored){
        alarms = JSON.parse(stored);
        showAlarms();
    }
}

// Save current alarms to localStorage
function saveAlarmsToStorage() {
    localStorage.setItem("alarms", JSON.stringify(alarms));
}

function updateTime() {
    let now = new Date(); // get current time
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");

    let currentTime = `${hours}:${minutes}:${seconds}`;

    document.getElementById('currentTime').innerText = currentTime;


// Check all alarms 
    for (let i = 0; i < alarms.length; i++){
        // Match time string 
        let alarmDate = new Date(alarms[i].time);
        let alarmHours = alarmDate.getHours().toString().padStart(2, "0");
        let alarmMinutes = alarmDate.getMinutes().toString().padStart(2, "0");
        let alarmSeconds = "00";

        let alarmTime = `${alarmHours}:${alarmMinutes}:${alarmSeconds}`;

        if(currentTime === alarmTime) {
            playAlarm(alarms[i].label);
            alarms.splice(i, 1);
            showAlarms();
            saveAlarmsToStorage();
            break;
        }
    }

}
setInterval(updateTime, 1000);
loadAlarmsFromStorage();

function setAlarm(){
    let time = document.getElementById('alarmTime').value;

    let label = document.getElementById('alarmLabel').value;

    // Slice time to remove seconds and match currentFormatted
     time = time.slice(0, 16); // "YYYY-MM-DDTHH:MM"

    if(time === "") {
        alert("Please select a time first!");
        return;
    }


    // alarmTime = time;
    // alert(`Alarm set for ${alarmTime}`);

    // Add to alarm array
    alarms.push({time:time, label:label});
    alert("Alarm set!");
    showAlarms();
    saveAlarmsToStorage();

    // Clear input boxes
    document.getElementById('alarmTime').value = "";

    document.getElementById('alarmLabel').value = "";
}

function playAlarm(label) {
    document.getElementById('alarmSound').play();
    alert("⏰" + (label || "Alarm!")); //if no label,just show "Alarm!"
}

function showAlarms() {
    let list = document.getElementById('alarmList');
    list.innerHTML = ""; // clear the list first

    for(let i = 0; i < alarms.length; i++){
        let item = document.createElement("li");
        item.innerHTML = alarms[i].time + "-" + (alarms[i].label || "No label") + `<button onclick = "deleteAlarm(${i})">Delete</button>`;
        list.appendChild(item);
    }
}

function deleteAlarm(index) {
    alarms.splice(index, 1);
    showAlarms();
    saveAlarmsToStorage();
}

function clearAllAlarms() {
    alarms = [];
    document.getElementById('alarmSound').pause();

    document.getElementById('alarmSound').currentTime = 0;
    alert("All alarms cleared.")
    showAlarms();
    saveAlarmsToStorage();
}
