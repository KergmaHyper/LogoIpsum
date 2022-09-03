function writePos() {
    let lat = document.getElementById('lat');
    lat.textContent = pos.lat;
    let lng = document.getElementById('lng');
    lng.textContent = pos.lng;
};

function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    var altitude = position.coords.altitude;
    var speed = position.coords.speed;
    pos = { lat: latitude, lng: longitude };
    writePos();
};

function error(obj) {
    console.log("Ошибка при определении положения");
};

// navigator.geolocation.getCurrentPosition(success, error);

