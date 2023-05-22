import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const CityBar = observer(() => {

    const {sanator} = useContext(Context)

    return (
        <Row className="d-flex" >
            {sanator.cities.map(city =>
                <Card
                    style={{cursor:'pointer', width: 'min-content'}}

                    key={city.id}
                    className="p-3"
                    onClick={() => sanator.setSelectedCity(city)}
                    border={city.id === sanator.selectedCity.id ? 'primary' : 'light'}
                >
                    {city.name}
                </Card>
            )}
        </Row>
    );
});

export default CityBar;
