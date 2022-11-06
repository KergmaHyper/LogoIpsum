let map;
let infoWindow;
let p = { lat: 0, lng: 0 };


// let pos = { lat: 48.93, lng: 38.49 };
let pos;
console.log("Init pos: ", pos);

function writePos(pos_) {
    let lat = document.getElementById('lat');
    lat.textContent = pos_.lat;
    let lng = document.getElementById('lng');
    lng.textContent = pos_.lng;
};


function success(position) {
    console.log('start success coord function');
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var altitude = position.coords.altitude;
    var speed = position.coords.speed;
    pos = { lat: latitude, lng: longitude };

    console.log("Centering map to coord: ", pos);

    infoWindow.setPosition(pos);
    infoWindow.setContent("Location found.");
    infoWindow.open(map);
    map.setCenter(pos);


    console.log("Setting marker to coord: ", pos);
    var optMarker = {
        position: pos,
        map: map,
        title: 'You here!',
    };
    var marker = new google.maps.Marker(optMarker);
    writePos(pos);



};

function error(obj) {
    console.log("Ошибка при определении положения");
    console.log('start error function');
    console.log(pos);
};


function placeMarkerAndPanTo(latLng, map) {
    new google.maps.Marker({
        position: latLng,
        map: map,
    });

    map.panTo(latLng);
    p = { lat: latLng.lat(), lng: latLng.lng() };
    console.log("p: ", p);
    writePos(p);
};


function initMap() {
    console.log("start initMap");
    console.log("getting loale position");
    navigator.geolocation.getCurrentPosition(success, error);


    map = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 13,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ["roadmap", "terrain"],
        },
    });
    infoWindow = new google.maps.InfoWindow();
    map.addListener("click", (e) => {
        placeMarkerAndPanTo(e.latLng, map);
    });


}

window.initMap = initMap;
