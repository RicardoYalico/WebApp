var map = L.map('map').setView([-12.073672, -77.039566], 13);

var marker = L.marker([-12.073672, -77.039566], 13).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    marker.setLatLng([e.latlng.lat, e.latlng.lng])
    document.getElementById('lat').value = e.latlng.lat;
    document.getElementById('lon').value = e.latlng.lng;
}

map.on('click', onMapClick);
