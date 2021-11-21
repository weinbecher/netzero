import React, {useState} from 'react';
import DatePicker from 'react-date-picker';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import Geocode from "react-geocode";
import moment from "moment";
const { DateTime } = require("luxon");

// import * as d3 from 'd3';

function WeatherComponent({markers}) {



  const [location, setLocation] = React.useState("");

    
  // function displayLocation(markers){
  //   if(!markers){
  //   const latitude = markers[0].lat;
  //   const longitude = markers[0].lng;
  //   console.log(latitude);
  //   console.log(longitude);
  //   // e.preventDefault();
  //   Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  //   Geocode.fromLatLng(latitude, longitude).then(
  //     (response) => {
  //     let address = response.results[0].formatted_address;
  //       setLocation(address);
  //       },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );}
  //   }

   var date = Date();

    const api = {
      key: "54b108763f27c2e29ad2eec3d2d9dcc3",
      base: "http://api.openweathermap.org/data/2.5/"
    }

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [pollution, setPollution] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const startDateTimestamp = startDate / 1000 | 0;
    const endDateTimestamp = endDate / 1000 | 0;

   console.log(markers);


  const getDateRangePollution = async () => {
    fetch(`${api.base}air_pollution/history?lat=${markers[markers.length -1].lat}&lon=${markers[markers.length -1].lng}&start=${startDateTimestamp}&end=${endDateTimestamp}&APPID=${api.key}`)
    .then(res => res.json())
    .then(resultRange => {
      setPollution(resultRange);
    });

  }

  const data = pollution;

  // const formatXAxis = (date).forEach (date => {
  //   return moment(date).format('DD/MM/YY HH:mm')})

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main className = "weather-box">
          <LineChart
            width={600}
            height={300}
            data={data.list}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="components.co" stroke="#8884d8" />
            <XAxis
              dataKey="dt"
              domain={['dataMin', 'dataMax']}
              type="number"
            />
            <YAxis />
            <Tooltip />
          </LineChart>

          <LineChart
            width={600}
            height={300}
            data={data.list}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="main.aqi" stroke="#8884d8" />
            <XAxis
              dataKey="dt"
              domain={['dataMin', 'dataMax']}
              type="number"
            />
            <YAxis />
            <Tooltip />
          </LineChart>


        <h3> Location </h3>

        <div className="date-time-picker-start">
          Start Date
          <DatePicker
            onChange={setStartDate}
            value={startDate}
            name={"Start Date"}
            calendarType={'ISO 8601'}
          />
        </div>
        <div className="date-time-picker-end">
          End Date
          <DatePicker
            onChange={setEndDate}
            value={endDate}
            name={"End Date"}
          />
        </div>
        <div className="pollution-data">
          <button onClick={getDateRangePollution}>Get pollution in date range</button>
        </div>
        <br></br>
      </main>
    </div>
  );
}

export default WeatherComponent;
