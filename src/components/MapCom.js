import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import './../styles/MapCom.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

const MapCom = ({ latitude, longitude }) => {
  const customIcon = new Icon({
    iconUrl: 'https://img.icons8.com/?size=512&id=XieTOK4V0QEI&format=png',
    iconSize: [38, 50],
  });
  return (
    <>
      {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}
    </>
  );
};

export default MapCom;
