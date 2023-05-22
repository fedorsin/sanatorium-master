import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Context } from '../';
import {addToBasket, deleteFromBasket, getBasket, getUserOrder, getUserOrderList} from '../http/sanatorAPI';
import {Button, Card, Col, Container, Row} from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import CreateOrder from "../components/modals/CreateOrder";
import Image from "react-bootstrap/Image";

const Basket = observer(() => {
    const {sanator,user, a} = useContext(Context)
    const [orderVisible, setOrderVisible] = useState(false)
    useEffect(() => {
        getBasket().then(data => sanator.setBaskets(data))
        getUserOrder(user.isUser).then(data => sanator.setOrders(data))
        getUserOrderList(sanator._selectedOrder).then(data => sanator.setOrdersList(data))
    }, [sanator,sanator._selectedOrder, a])

const refreshPage = ()=>{
    window.location.reload();
}
    const _delete = (id) => {
        deleteFromBasket(id).then(response => alert(`Санаторий удален из корзины`)).then(response => refreshPage())

    }

    // ----- Считаем общую сумму, которую юзер набрал в корзину ------- //

    let prices = 0;
    {sanator.basket.map(price =>
        prices += price.sanator.price
    )}
    let prices2 = 0;
     {sanator._orders_lists.map(price =>
        prices2 += price.sanator.price
    )}
    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Избранное</h1>

            {/* ------- Считаем общую сумму ------- */}


            {sanator.basket.map(product =>
                <Card className="d-flex w-100 p-2 justify-content-center mb-2"  key={product.id}>

                        <Row>
                            <Col md="2" className="d-inline-flex flex-row">
                            <div className="flex-row" >
                                <img src={process.env.REACT_APP_API_URL + product.sanator.img} alt="img not found" height={100}  />
                            </div>
                            </Col>
                            <Col  className="d-flex flex-row">
                            <div className="flex-row">
                                <h1 className="ms-3">{product.sanator.name}</h1>
                            </div>
                            </Col>
                                <Col  className="d-flex flex-row justify-content-end">
                            <div className="flex-row">
                                <h2 className="font-weight-light">от {product.sanator.price} руб. </h2>
                            </div>
                                </Col>
                            <Col  className="d-flex flex-row justify-content-end">
                                <div className="flex-row">
                                    <Button className="bg-danger" onClick={() => _delete(product.id)}> X </Button>
                                </div>
                            </Col>
                        </Row>
                </Card>
            )}

            <Row> <Button className="bg-success mt-4" onClick={() => setOrderVisible(true)} >Оформить запрос</Button> </Row>


            {sanator.order.map(product =>


                <Card className="d-flex w-100 pb-3  m-3">
                    <Row className=" d-flex m-3">
                        <Row className=" w-100 row pb-1">

                            <Col className={"mt-3"}>Addressee</Col>
                            <Col className={"mt-3"}>Postcode</Col>
                            <Col className={"mt-3"}>Status</Col>
                        </Row>
                        <Row>
                        <Col><h3>{product.addressee}</h3></Col>
                        <Col><h3>{product.postcode}</h3></Col>
                        <Col>
                            {{
                                '0': <h3> Closed</h3>,
                                '1': <h3> Stay</h3>,
                                '2': <h3> Go</h3>,
                                '3': <h3> Complete</h3>
                            }[product.status]}
                            <Button className="w-75 align-self-center ms" onClick={() => sanator.setSelectedOrder(product.id)}> Открыть </Button>
                        </Col>
                        </Row>

                    </Row>
                    {product.id == sanator.selectedOrder &&
                    <Row className=" d-flex mb-2 p-4 w-100  m-3">
                        <Col className={"mt-3"}>Name</Col>
                        <Col className={"mt-3"}>Price</Col>
                        <Col className={"mt-3"}>Image</Col>
                    </Row>}
                    {product.id == sanator.selectedOrder &&
                    sanator._orders_lists.map
                    (product =>
                        <Card className=" d-flex mb-2 p-4 m-3  ">
                            <Row className="row">

                                <Col className={"mt-3"}>{product.sanator.name}</Col>
                                <Col className={"mt-3"}>{product.sanator.price}</Col>
                                <Col className={"mt-3"}><Image width={75} height={75} src={process.env.REACT_APP_API_URL + product.sanator.img}/></Col>
                            </Row>
                        </Card>
                    )}
                    {product.id == sanator.selectedOrder &&
                    <Card className="d-flex flex-row  p-2 m-3 justify-content-between align-items-center mb-2">
                        <h1 className="align-self-end" >Всего:</h1>
                        <h3  className="ms-3 align-self-end">{prices2}<span className="font-weight-light pl-2"> руб. </span></h3>
                    </Card>}

                </Card>
            )}




            <CreateOrder show={orderVisible} onHide={() => setOrderVisible(false)}/>
        </Container>
    );

});

export default Basket;
