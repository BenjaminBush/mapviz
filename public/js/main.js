var map = L.map('map-template').setView([33.88, -118.24], 12);

const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png' 
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

const tile = L.tileLayer(tileURL2);

map.addLayer(tile);

// Socket Io
const socket = io.connect();

// Color Dictionary
var colors = {};
colors["red"] = '#f03';
colors["green"] = '#009933';
colors["yellow"] = '#ffff00';

// Latitude and Longitude Dictionary
lats = {};
longs = {};

lats['el_segundo'] = 33.928621
longs['el_segundo'] = -118.368522

lats['wilmington'] = 33.825757
longs['wilmington'] = -118.24005

lats['long_beach'] = 33.824173
longs['long_beach'] = -118.207084

lats['lynwood'] = 33.914156
longs['lynwood'] = -118.184451

lats['athens'] = 33.928478
longs['athens'] = -118.284031

lats['east_rancho_dominguez'] = 33.877433
longs['east_rancho_dominguez'] = -118.192776

var el_segundo = L.circle([lats['el_segundo'], longs['el_segundo']], {
  color: 'red',
  fillColor: colors["red"],
  fillOpacity:0.5,
  radius:2000
});

var wilmington = L.circle([lats['wilmington'], longs['wilmington']], {
  color: 'red',
  fillColor: colors["red"],
  fillOpacity:0.5,
  radius:1500
});

var long_beach = L.circle([lats['long_beach'], longs['long_beach']], {
  color: 'red',
  fillColor: colors["red"],
  fillOpacity:0.5,
  radius:1500
});

var lynwood = L.circle([lats['lynwood'], longs['lynwood']], {
  color: 'red',
  fillColor: colors["red"],
  fillOpacity:0.5,
  radius:2000
});

var athens = L.circle([lats['athens'], longs['athens']], {
  color: 'red',
  fillColor: colors["red"],
  fillOpacity:0.5,
  radius:2000
});

var east_rancho_dominguez = L.circle([lats['east_rancho_dominguez'], longs['east_rancho_dominguez']], {
  color: 'red',
  fillColor: colors["red"],
  fillOpacity:0.5,
  radius:2000
});



el_segundo.addTo(map);
wilmington.addTo(map);
long_beach.addTo(map);
lynwood.addTo(map);
athens.addTo(map);
east_rancho_dominguez.addTo(map);


socket.on('channel', function(data) {
  var path_str = "The optimal path is ";

  // Parse the Kafka Record
  data = data.value.toString();
  console.log(data);
  var split_data = data.split(';');
  var i = 0;

  var city = split_data[i];
  i += 1;

  var avg_speed = split_data[i];
  i += 1;

  // var actual_flows = [];
  while (i < 14) {
    //actual_flows[i] = split_data[i];
    i += 1;
  }

  // pred_flow = split_data[i]
  // predicted_flows[i] = pred_flow
  i += 1

  //var old_ns = int(float(split_data[i]));
  i += 1

  var graph_path = split_data.slice(i, split_data.length)

  path_str += graph_path;

  var col;
  if (avg_speed >= 55) {
    col = "green";
  } else if (avg_speed < 55 && avg_speed >= 30) {
    col = "orange";
  } else {
    col = "red";
  }


  // Update the city marker
  window[city].setStyle({
    color:col,
    fillColor: colors[col]
  });
  document.getElementById("opt_path").innerHTML = path_str;
  console.log(data);
});

