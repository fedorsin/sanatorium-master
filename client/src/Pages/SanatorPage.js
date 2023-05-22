import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png';
import {useParams} from 'react-router-dom';
import {addToBasket, delSanator, fetchOneSanator, setDescription, updateAmount} from "../http/sanatorAPI";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import SetDescription from "../components/modals/SetDescription";
import {Map, Placemark, useYMaps, YMaps} from "@pbe/react-yandex-maps";
import Search from "../components/Search";
import {RiCustomerService2Fill} from "react-icons/ri";
import {MdOutlineTravelExplore} from "react-icons/md";



const SanatorPage = observer(() => {

    const {user} = useContext(Context)
    const [sanator, setSanator] = useState({info: []})
    const {id} = useParams()
    const [sanatorVisible, setSanatorVisible] = useState(false)

    useEffect(() => {
        fetchOneSanator(id).then(data => setSanator(data))
    }, [])

    const [value, setValue] = useState('')

    const Amount = () => {
        updateAmount(id, value).then(response => alert(`Количество путевок обновлено`))
    }
    const mapRef = useRef(null);

    const YandexMap = () => (

        <YMaps >
            <div>
                <Map width='100%' defaultState={{
                    center: [sanator.latitude, sanator.longitude],
                    zoom: 10,
                    controls: ["zoomControl", "fullscreenControl"],
                }}
                     modules={["control.ZoomControl", "control.FullscreenControl"]}
                >

                    <Placemark geometry={[sanator.latitude, sanator.longitude]} />
                </Map>
            </div>
        </YMaps>

    );


    // ------- Функция добавления в корзину ------- //
    const add = () => {
        const formData = new FormData()
        formData.append('sanatorId', id)
        addToBasket(formData).then(response => alert(`Санаторий ` + sanator.name + ` был добавлен в вашу корзину!`))
    }

    return (

        <Container className="mt-3">

            <Row>
                <Image width={200} height={150} src={process.env.REACT_APP_API_URL + sanator.img}/>
                <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-4 px-4 py-4'>
                    <div className='lg:col-span-2 flex flex-col justify-evenly'>
                        <div>
                            <h1>{sanator.name}</h1>
                            <h3 className='py-8' style={{fontWeight: 'normal'}}>
                                {sanator._info}
                            </h3>
                        </div>
                        <div className='grid sm:grid-cols-2 gap-8 py-4'>
                            <div className='flex flex-col lg:flex-row items-center text-center'>
                                <button>
                                    <RiCustomerService2Fill size={50} />
                                </button>
                                <div>
                                    <h3 className='py-2'>LEADING SERVICE</h3>
                                    <p className='py-1'>ALL-INCLUSIVE COMPANY FOR 20 YEARS IN-A-ROW</p>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row items-center text-center'>
                                <button>
                                    <MdOutlineTravelExplore size={50} />
                                </button>
                                <div>
                                    <h3 className='py-2'>LEADING SERVICE</h3>
                                    <p className='py-1'>ALL-INCLUSIVE COMPANY FOR 20 YEARS IN-A-ROW</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='border text-center'>
                            <p className='pt-2'>GET AN ADDITIONAL 10% OFF</p>
                            <p className='py-4'>12 HOURS LEFT</p>
                            <p className='bg-gray-800 text-gray-200 py-2'>BOOK NOW AND SAVE</p>
                        </div>
                        <form className='w-full'>
                            <div className='flex flex-col my-2'>
                                <label>Destination</label>
                                <select className='border rounded-md p-2'>
                                    <option>Grande Antigua</option>
                                    <option>Key West</option>
                                    <option>Maldives</option>
                                    <option>Cozumel</option>
                                </select>
                            </div>
                            <div className='flex flex-col my-4'>
                                <label>Check-In</label>
                                <input className='border rounded-md p-2' type="date" />
                            </div>
                            <div className='flex flex-col my-2'>
                                <label>Check-Out</label>
                                <input className='border rounded-md p-2' type="date" />
                            </div>
                            <button className='w-full my-4'>Rates & Availabilities</button>
                        </form>
                    </div>

                </div>

                <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-4 px-4 py-4'>
                    <div className='lg:col-span-2 flex flex-col justify-evenly'>
                        <div>
                            <h1>Характеристики</h1>
                        </div>
                    </div>


                    <div className='lg:col-span-3 flex flex-col justify-evenly'>

                        <Col className='py-8' style={{fontWeight: 'normal'}}>

                            <Row key={sanator.id} style={{
                                border: '2px solid lightgray',
                                background: 'lightgray',
                                padding: 10
                            }}>
                                <Col>Название:</Col>
                                <Col>{sanator.name}</Col>
                            </Row>

                            <Row key={sanator.id} style={{
                                border: '2px solid lightgray',
                                background: 'transparent',
                                padding: 10
                            }}>
                                <Col>Адрес:</Col> <Col> {sanator.address}</Col>
                            </Row>

                            <Row key={sanator.id} style={{
                                border: '2px solid lightgray',
                                background: 'lightgray',
                                padding: 10
                            }}>
                                <Col>Cайт:</Col> <Col><a target="_blank" href={sanator.site}> {sanator.site}</a></Col>
                            </Row>

                            <Row key={sanator.id} style={{
                                border: '2px solid lightgray',
                                background: 'transparent',
                                padding: 10
                            }}>
                                <Col>Телефон:</Col>
                                <Col>{sanator.phone}</Col>
                            </Row>

                            {sanator.info.map((info, index) =>
                                <Row key={info.id} style={{
                                    border: '2px solid lightgray',
                                    background: index % 2 === 0 ? 'lightgray' : 'transparent',
                                    padding: 10
                                }}>
                                    <Col>{info.title}:</Col><Col>  {info.description}</Col>
                                </Row>
                            )}
                        </Col>
                    </div>
                </div>


                    <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-4 px-4 py-4'>
                        <div className='lg:col-span-2 flex flex-col justify-evenly'>
                            <div>
                                <h1>Расположение</h1>
                                <h3 className='py-8' style={{fontWeight: 'normal'}}>
                                    Месторасположение санатория указано на карте.
                                    Для удобства использования карту можно открыть на весь экран. Или перейти по ссылке в Яндекс.карты.
                                    При нажатии на кнопку "Как добраться" можно построить маршрут от точки направления до пункта назначения.
                                </h3>
                            </div>
                            <div className='grid sm:grid-cols-2 gap-8 py-4'>
                                <div className='flex flex-col lg:flex-row items-center text-center'>
                                    <button>
                                        <RiCustomerService2Fill size={50} />
                                    </button>
                                    <div>
                                        <h3 className='py-2'>LEADING SERVICE</h3>
                                        <p className='py-1'>ALL-INCLUSIVE COMPANY FOR 20 YEARS IN-A-ROW</p>
                                    </div>
                                </div>
                                <div className='flex flex-col lg:flex-row items-center text-center'>
                                    <button>
                                        <MdOutlineTravelExplore size={50} />
                                    </button>
                                    <div>
                                        <h3 className='py-2'>LEADING SERVICE</h3>
                                        <p className='py-1'>ALL-INCLUSIVE COMPANY FOR 20 YEARS IN-A-ROW</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='border text-center'>
                                <p className='pt-2'>GET AN ADDITIONAL 10% OFF</p>
                                <p className='py-4'>12 HOURS LEFT</p>
                                <p className='bg-gray-800 text-gray-200 py-2'>BOOK NOW AND SAVE</p>
                            </div>
                            <form className='w-full'>
                                <YandexMap/>

                                <button className='w-full my-4'>Rates & Availabilities</button>
                            </form>
                        </div>
                    </div>


            </Row><br/>
            <Row>
                <Col className={"w-75"}>
                    <Button

                        variant={"outline-dark"}
                        className="d-flex mt-2 p-8 bg-primary text-light"
                        onClick={() => setSanatorVisible(true)}
                    >
                        Изменить описание
                    </Button>
                <Col md={3}>
                </Col>
                </Col>

            </Row>

            {user.isRole === "ADMIN"?
            <Row>
                <Card className ="d-flex flex-column w-50 mt-4 align-self-end p-3">
                        <h3 className="mx-auto"> Изменение количества путевок</h3>
                        <Form>
                        <Form.Control
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder={"Введите количество: "}
                            //style={{height:"auto"}}
                            className="mt-4 w-100 p-2"
                        />
                            <Button
                                variant={"outline-dark"}
                                className="mt-4 w-100 p-2 bg-success text-light"
                                onClick={Amount}
                            >
                                Обновить количество
                            </Button>
                    </Form>

                    <Button
                        variant={"outline-dark"}
                        className="mt-4 w-45 p-2 bg-danger text-light"
                        onClick={() => delSanator(id).then(response => alert(`Санаторий был удален!`)) }
                    >
                        Убрать из наличия
                    </Button>
                </Card>
                <SetDescription show={sanatorVisible} onHide={() => setSanatorVisible(false)}/>
            </Row>:<br/>
        }
        </Container>
    );
});
export default SanatorPage;
