import React,  {useState} from "react";
import Geocode from "react-geocode";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import SearchComponent from './SearchComponent';
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";


export default function MapComponent({parentCallback }) {
  const libraries = ["places"];
  const mapContainerStyle = {
    height: "800px",
    width: "1000px",
  };
  //custom options of google map
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  // find location on https://www.latlong.net/

  const center = {
    lat: 51.507351,
    lng: -0.127758,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);

  const sendData = () => {
    parentCallback(markers);
  };

  // console.log(markers);

  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);


const [location, setLocation] = React.useState("");


function displayLocation(latitude,longitude ){
    // e.preventDefault();
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
       let address = response.results[0].formatted_address;
        setLocation(address);
        },
      (error) => {
        console.error(error);
      }
    );
}

const api = {
  key: "c689226726c66056c7e27a6cf24a57ff",
  base: "http://api.openweathermap.org/data/2.5/"
}

const [pollution, setPollution] = useState({});

const getPollution = async() => {
  markers.forEach(marker => {
   fetch(`${api.base}air_pollution?lat=${marker.lat}&lon=${marker.lng}&APPID=${api.key}`)
   .then(res => res.json())
   .then(result => {
     setPollution(result);
     // console.log(result);
   })
    });
}

if (loadError) return "Error";
if (!isLoaded) return "Loading...";

  return (
  
    <div>
      <h1>
        netZero
      </h1>

      <SearchComponent panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={6} // how close up you want the map to be
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
              sendData();
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h3 onChange = {displayLocation(selected.lat, selected.lng)}>{location}</h3>
              <p>As in {formatRelative(selected.time, new Date())}</p>
              <button onClick = {getPollution}>Get pollution</button>
              {(typeof pollution.list != "undefined" && pollution.list.length === 1) ? (
              <div>
                <div className="pollution-box">
                  <div className="pollutionCO">CO: {pollution.list[0].components.co}</div>
                  <div className="pollutionNH3">NH3: {pollution.list[0].components.nh3}</div>
                  <div className="pollutionNO">NO: {pollution.list[0].components.no}</div>
                  <div className="pollutionNO2">NO2: {pollution.list[0].components.no2}</div>
                  <div className="pollutionO3">O3: {pollution.list[0].components.o3}</div>
                  <div className="pollutionPM2_5">PM2_5: {pollution.list[0].components.pm2_5}</div>
                  <div className="pollutionPM10">PM10: {pollution.list[0].components.pm10}</div>
                  <div className="pollutionSO2">SO2: {pollution.list[0].components.so2}</div>
                </div>
              </div>
              ) : ('')}
              
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}


export const MemoizedLocation = React.memo(MapComponent);

