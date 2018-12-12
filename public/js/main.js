var map = L.map('map-template').setView([33.88, -118.24], 12);

const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png' 
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

const tile = L.tileLayer(tileURL2);

// Socket Io
const socket = io.connect();

L.marker([33.928621, -118.368522]).addTo(map);
L.marker([33.825757, -118.24005]).addTo(map);
L.marker([33.824173, -118.207084]).addTo(map);
L.marker([33.914156, -118.184451]).addTo(map);
L.marker([33.928478, -118.284031]).addTo(map);
L.marker([33.877433, -118.192776]).addTo(map);


socket.on('channel', function(data) {
  var path_str = "The optimal path is ";
  path_str += data.value.toString();
  document.getElementById("opt_path").innerHTML = path_str;
  console.log(data);
});


// Geolocation
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const coords = [e.latlng.lat, e.latlng.lng];
  const newMarker = L.marker(coords);
  newMarker.bindPopup('You are Here!');
  map.addLayer(newMarker);
  socket.emit('userCoordinates', e.latlng);
});

// socket new User connected
socket.on('newUserCoordinates', (coords) => {
  console.log(coords);
  const userIcon = L.icon({
    iconUrl: '/img/icon2.png',
    iconSize: [38, 42],
  })
  const newUserMarker = L.marker([coords.lat, coords.lng], {
    icon: userIcon 
  });
  newUserMarker.bindPopup('New User!');
  map.addLayer(newUserMarker);
}); 

map.addLayer(tile);
