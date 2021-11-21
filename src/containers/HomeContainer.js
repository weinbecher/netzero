
import React, {useState} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import MapComponent from "../components/MapComponent" 
import WeatherComponent from '../components/WeatherComponent';

export default function HomeContainer(){

    const [markers, setMarkers] = useState([]);
    const [pollutionData, setPollutionData] = useState({});

    const callbackMarkers = marks => {
        setMarkers(marks);
    };  

    const callBackPollution = pollutionData =>{
        setPollutionData(pollutionData);
    }
    // console.log(pollutionData);

    return(
        <Container fluid>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
            <Col xs={12} md={8}>
            <MapComponent  parentCallback={callbackMarkers} pollution = {pollutionData}/>
            {/* <p>Parent message: {message}</p> */}
            </Col>
            <Col xs={6} md={4}>
            <WeatherComponent markers = {markers} parentPollutionCallback = {callBackPollution}></WeatherComponent>         
            </Col>
        </Row>

        {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
        <Row>
        </Row>

        {/* Columns are always 50% wide, on mobile and desktop */}
        </Container>

    )
}