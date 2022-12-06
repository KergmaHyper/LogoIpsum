let map;
let infoWindow;
let marker;
let pos = 0;
let markerPosition;
let p = {
    lat: 49,
    lng: 38,
    getCoords(ll) { this.lat = ll.lat(); this.lng = ll.lng(); }
};

function posObj(latLng) {
    let _lat = latLng.lat();
    let _lng = latLng.lng();
    this.lat = function () { return _lat; };
    this.lng = function () { return _lng; };
}


function createMarkerPosition(latLng) {
    return ({
        lat: latLng.lat(),
        lng: latLng.lng(),
        createMarker: function (map) {
            return new google.maps.Marker({ position: { lat: this.lat, lng: this.lng }, map });
        }
    });
}
function writePos(pos) {
    let lat = document.getElementById('lat');
    let lng = document.getElementById('lng');
    lat.textContent = pos.lat;
    lng.textContent = pos.lng;
};

function success(position) {
    console.log('start success coord function');
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    pos = { lat, lng };
    console.log("Centering map to coord: ", pos);

    infoWindow.setPosition(pos);
    infoWindow.setContent("Location found.");
    infoWindow.open(map);

    map.setCenter(pos);
    console.log("Setting marker to coord: ", pos);
    let optMarker = {
        position: pos,
        map,
        title: 'You here!',
    };


    //    marker = new google.maps.Marker(optMarker);
    markerPosition = createMarkerPosition({
        lat: function () { return pos.lat },
        lng: () => pos.lng
    });
    marker = markerPosition.createMarker(map);

    console.log(optMarker, marker);
    console.log("!!!!!!!!!!!!Marker position", markerPosition);
    writePos(pos);
};

function error(obj) {
    console.log("Ошибка при определении положения");
    console.log('start error function');
    console.log(pos);
};

function placeMarkerAndPanTo(position, map) {
    new google.maps.Marker({ position, map, });
    map.panTo(latLng);
    p.getCoords(position);
    console.log("p: ", p);
    writePos(p);
};

function moveMarker(latLng) {
    marker.setPosition(latLng);
    p.getCoords(latLng);
    console.log("p: ", p);
    writePos(p);

    var pos = new posObj(latLng);
    console.log(pos);

    console.log(globalThis.pos);

    // for (const pr in pos) {
    //     console.log(pr, " : ", pos[pr]());
    // }
}

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
        // placeMarkerAndPanTo(e.latLng, map);
        moveMarker(e.latLng);
    });


}

window.initMap = initMap;
window.pos = pos;
