function updateTime() {
    var date = new Date();
    var hours = pad(date.getHours());
    var minutes = pad(date.getMinutes());
    var seconds = pad(date.getSeconds());
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
    
    // Update date
    var day = pad(date.getDate());
    var month = pad(date.getMonth() + 1); // Months are 0-based
    var year = date.getFullYear();
    document.getElementById('day').innerHTML = day;
    document.getElementById('month').innerHTML = month;
    document.getElementById('year').innerHTML = year;
  }
  
  function pad(number) {
    return number < 10 ? '0' + number : number; // Adds leading zero
  }
  
  setInterval(updateTime, 1000); // Updates every second
  updateTime(); // Initial call