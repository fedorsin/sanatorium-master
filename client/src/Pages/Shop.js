import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import CityBar from "../components/CityBar";
import SanatorList from "../components/SanatorList";
import Hero from '../components/Hero';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCities, fetchSanators, fetchTypes} from "../http/sanatorAPI";
import Pages from "../components/Pages";


const Shop = observer(() => {
    const {user} = useContext(Context)
    const {sanator} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => sanator.setTypes(data))
        fetchCities().then(data => sanator.setCities(data))
        fetchSanators(null, null, sanator.page, sanator.limit).then(data => {
            sanator.setSanators(data.rows)
            sanator.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchSanators(sanator.selectedType.id, sanator.selectedCity.id, sanator.page, sanator.limit).then(data => {
            sanator.setSanators(data.rows)
            sanator.setTotalCount(data.count)
        })
    }, [sanator.page, sanator.selectedType, sanator.selectedCity,])

    return (
        <div>
            <Hero/>

        <Container>

            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <CityBar/>
                    <SanatorList />
                    <Pages/>
                </Col>
            </Row>
        </Container>
        </div>
    );

});

export default Shop;
