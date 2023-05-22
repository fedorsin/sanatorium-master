import React, {useEffect, useRef} from 'react';
import { useContext, useState } from 'react';
import { Context } from '../';
import {fetchCities, fetchLegal, fetchTypes, getOrder, getUserOrderList} from '../http/sanatorAPI';
import {Button, Card, Col, Container, Dropdown, Row} from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import CreateOrder from "../components/modals/CreateOrder";

const Basket = observer(() => {
    const {sanator,user, a} = useContext(Context)
    const [orderVisible, setOrderVisible] = useState(false)
    const myRef = useRef(null)
    useEffect(() => {
        getOrder(user.isUser).then(data => sanator.setOrders(data))
        getUserOrderList(sanator._selectedOrder).then(data => sanator.setOrdersList(data))
    }, [sanator,sanator._selectedOrder, a])

    // ----- Считаем общую сумму, которую юзер набрал в корзину ------- //

    let prices = 0;
    {sanator._orders_lists.map(price =>
        prices += price.sanator.price
    )}
    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pt-5 pb-2">Избранное</h1>


            {sanator.order.map(product =>


                <Card className="d-flex w-100 pb-3  m-3">
                    <Row d-flex>
                        <Row className="row pb-1 m-3 ">

                            <Col className={"mt-3"}>Addressee</Col>
                            <Col className={"mt-3"}>Postcode</Col>
                            <Col className={"mt-3"}>Status</Col>
                        </Row>
                        <Row className="row pb-1 m-3 ">
                            <Col><h3>{product.addressee}</h3></Col>
                            <Col><h3>{product.postcode}</h3></Col>
                            <Col>
                                {{
                                    '0': <h3> Closed</h3>,
                                    '1': <h3> Stay</h3>,
                                    '2': <h3> Go</h3>,
                                    '3': <h3> Complete</h3>
                                }[product.status]}
                                <Button className="w-75 align-self-center ms" onClick={() => sanator.setSelectedOrder(product.id)}> Open </Button>
{/*                                <Dropdown className="mt-2 mb-2">
                                    <Dropdown.Toggle>{sanator.status || "Оберіть статус"}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {sanator.order.map(order =>
                                            <Dropdown.Item
                                                key={order.id}
                                            >
                                                {{
                                                    '0': <h3> Closed</h3>,
                                                    '1': <h3> Stay</h3>,
                                                    '2': <h3> Go</h3>,
                                                    '3': <h3> Complete</h3>
                                                }[order.status]}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>*/}
                            </Col>
                        </Row>

                    </Row>
                    {product.id == sanator.selectedOrder &&
                        sanator.selectedOrder &&
                                <Row className="  row pb-1 m-3">
                                    <Col className={"mt-3"}>id</Col>
                                    <Col className={"mt-3"}>Name</Col>
                                    <Col className={"mt-3"}>Price</Col>
                                </Row>
                            }
                    {product.id == sanator.selectedOrder &&
                    sanator._orders_lists.map
                    (product =>

                        <Card className="  p-2 row m-3  ">
                            <Row className="row">
                                <Col className={"mt-3"}>{product.sanator.id}</Col>
                                <Col className={"mt-3"}>{product.sanator.name}</Col>
                                <Col className={"mt-3"}>{product.sanator.price}</Col>
                            </Row>
                        </Card>
                    )}
                    {product.id == sanator.selectedOrder &&
                    <Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-1 m-3">
                        <h1 className="align-self-end" >Усього:</h1>
                        <h3  className="ms-3 align-self-end">{prices}<span className="font-weight-light pl-2"> руб. </span></h3>
                    </Card>}
                </Card>
            )}

        </Container>
    );

});

export default Basket;
