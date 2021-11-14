
import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import MapComponent from "../components/MapComponent" 

export default function HomeContainer(){
    return(
        <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
            <Col xs={12} md={8}>
            <MapComponent/>
            </Col>
            <Col xs={6} md={4}>
            xs=6 md=4
             <Row>1</Row>
             <Row>2</Row>
             <Row>3</Row>
             <Row>4</Row>
            </Col>
        </Row>

        {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
        <Row>
            <Col xs={6} md={4}>
            xs=6 md=4
            </Col>
            <Col xs={6} md={4}>
            xs=6 md=4
            </Col>
            <Col xs={6} md={4}>
            xs=6 md=4
            </Col>
        </Row>

        {/* Columns are always 50% wide, on mobile and desktop */}
        </Container>



    )
}