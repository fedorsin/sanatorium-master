import React, {useContext} from 'react';
import {Card, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import {SANATOR_ROUTE} from "../utils/consts";
import {Context} from "../index";
import { BsGeoAlt } from 'react-icons/bs';


const SanatorItem = ({sa}) => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const {sanator} = useContext(Context)
    return (
        <Col md={3} className={"mt-3 target=\"_blank\""} onClick={() => navigate(SANATOR_ROUTE + '/' + sa.id)}>
            <Card className='h-100'>
                <div className="ratio ratio-4x3">
                <Card.Img
                    width={150} height={150}
                    src={process.env.REACT_APP_API_URL + sa.img}
                    alt='...'
                    position='top'
                />
                </div>
                <Card.Body>
                    <Card.Title>{sa.name}</Card.Title>
                    <BsGeoAlt className='inline' size={20} style={{color: '#4169E1'}}/>
                    {sanator.cities.map(city => city.id === sa.cityId ? `${city.name}` : '')}
                    <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                        <div></div>
                        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                            <div>от {sa.price} руб.</div>
                        </div>
                    </div>


                </Card.Body>

            </Card>
        </Col>

            );
};

export default SanatorItem;
