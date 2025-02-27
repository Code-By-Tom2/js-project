function setAlarm() {
    const alarmTime = document.getElementById("alarmTime").value;
    if (!alarmTime) {
        alert("Please set a valid time for the alarm.");
        return;
    }
    
    const alarm = new Date();
    const [hours, minutes] = alarmTime.split(":");
    alarm.setHours(hours, minutes, 0);

    const now = new Date();
    const timeToAlarm = alarm - now;
    
    if (timeToAlarm >= 0) {
        setTimeout(() => {
            alert("Alarm ringing!");
        }, timeToAlarm);
    } else {
        alert("Selected time is in the past. Please choose a future time.");
    }
}