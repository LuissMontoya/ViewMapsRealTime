const map = L.map('map-template').setView([4.570868, -74.297333], 5);

//inicializar la conexion de socket
const socket = io();

const tileURL = 'https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png';
const tileURL2 = 'http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png';


L.tileLayer(tileURL2).addTo(map);

map.locate({ enableHeighAccuracy: true });

map.on('locationfound', e => {
    //console.log(e);
    const coords = [e.latlng.lat, e.latlng.lng];
    const marker = L.marker(coords);
    marker.bindPopup('Estas Aquí');
    map.addLayer(marker);
    socket.emit('userCoordinates', e.latlng)

});


socket.on('newUserCoordinates', (coords) => {
    console.log('Un nuevo Usuario se ha Conectado!')
    const marker = L.marker([coords.lat + 12, coords.lng + 5]);
    marker.bindPopup('Hello There');
    map.addLayer(marker);
});

socket.on('Bay', () => {
    //alert('Usuario desconectado!');
    console.log('Usuario desconectado!');
});



//const marker = L.marker([4.570868, -74.297333]);
//marker.bindPopup('Hello There');
//map.addLayer(marker);