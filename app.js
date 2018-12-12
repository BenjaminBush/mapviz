// Initialize leaflet.js
var L = require('leaflet');

// Initialize the map
var map = L.map('map', {
  scrollWheelZoom: false
});

// Set the position and zoom level of the map
map.setView([33.88, -118.24], 12);

// Set the markers
var el_segeundo_marker = L.marker([33.928621, -118.368522]).bindTooltip(
	{
		permanent: true,
		direction: 'right'
	}
);
el_segeundo_marker.addTo(map);

L.marker([33.825757, -118.24005]).addTo(map);
L.marker([33.824173, -118.207084]).addTo(map);
L.marker([33.914156, -118.184451]).addTo(map);
L.marker([33.928478, -118.284031]).addTo(map);
L.marker([33.877433, -118.192776]).addTo(map);



// Initialize the base layer
var osm_mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);