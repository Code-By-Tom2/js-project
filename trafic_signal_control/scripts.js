function setLight(trafficLight, color) {
    const lights = trafficLight.querySelectorAll('.light');
    lights.forEach(light => light.classList.remove('active'));
    const targetLight = trafficLight.querySelector(`.${color}-light`);
    if (targetLight) {
        targetLight.classList.add('active');
    }
}

function setState(state) {
    const nsLight = document.getElementById('ns-light');
    const ewLight = document.getElementById('ew-light');
    switch(state) {
        case 0:
            setLight(nsLight, 'green');
            setLight(ewLight, 'red');
            setTimeout(() => setState(1), 3000);
            break;
        case 1:
            setLight(nsLight, 'yellow');
            setLight(ewLight, 'red');
            setTimeout(() => setState(2), 1000);
            break;
        case 2:
            setLight(nsLight, 'red');
            setLight(ewLight, 'green');
            setTimeout(() => setState(3), 3000);
            break;
        case 3:
            setLight(nsLight, 'red');
            setLight(ewLight, 'yellow');
            setTimeout(() => setState(0), 1000);
            break;
    }
}

// Start the cycle
setState(0);