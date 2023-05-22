import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createSanator, fetchCities, fetchLegal, fetchTypes} from "../../http/sanatorAPI";
import {observer} from "mobx-react-lite";
import { Select, Option, Input } from "@material-tailwind/react";

const CreateSanator = observer(({show, onHide}) => {
    const {sanator} = useContext(Context)
    const [name, setName] = useState('')
    const [site, setSite] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [country, setCountry] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [amount, setAmount] = useState(1)
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => sanator.setTypes(data))
        fetchCities().then(data => sanator.setCities(data))
        fetchLegal().then(data => sanator.setLegals(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addSanator = () => {
        const formData = new FormData()
        try{
            formData.append('name', name)
            formData.append('site', site)
            formData.append('address', address)
            formData.append('phone', phone)
            formData.append('country', 10)
            formData.append('latitude', `${latitude}`)
            formData.append('longitude', `${longitude}`)
            formData.append('price', `${price}`)
            formData.append('img', file)
            formData.append('amount', `${amount}`)
            formData.append('cityId', sanator.selectedCity.id)
            formData.append('typeId', sanator.selectedType.id)
            formData.append('legalId', sanator.selectedLegal.id)
            formData.append('info', JSON.stringify(info))
            createSanator(formData).then(data => onHide())
        } catch(e){
            alert(e)
        }
    }


    setStrictNumberPattern();

    function setStrictNumberPattern(){
        let inp = document.querySelectorAll('.js-strict-number-pattern');

        for( let i = 0; i < inp.length; i++ ){
            let lastVal = "";
            inp[i].addEventListener('input', function(){
                if( !this.value ) return (lastVal = "");
                // символ ! превращает false в true (и наоборот).
                // Если например стерли введенное и this.value оказался пустой строкой (false)
                // Условие сработает и return прервет функцию.

                if( (/^\d+[.,]?\d*$/).test( this.value ) ){
                    lastVal = this.value = this.value.replace(/,/,".");
                } else {
                    this.value = lastVal;
                    // Если тест не прошел - возвращаем старое значение в инпут.

                    //.. display error message.
                }
            });
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить санаторий
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="flex flex-col gap-6">

                        <div className= "flex flex-col gap-6 w-72">
                        <Select label={"Выбрать тип"}>
                        {sanator.types.map(type =>
                            <Option onClick={() => sanator.setSelectedType(type)}
                                    key={type.id}
                            >
                                {type.name}
                            </Option>
                        )}
                    </Select>


                    <Select label={"Указать город"}>
                        {sanator.cities.map(city =>
                            <Option onClick={() => sanator.setSelectedCity(city)}
                                    key={city.id}
                            >
                                    {city.name}
                            </Option>
                        )}
                    </Select>

                    <Select label={"Выбрать агенство"}>
                        {sanator.legals.map(legal=>
                            <Option onClick={() => sanator.setSelectedLegal(legal)}
                                    key={legal.id}
                            >
                                    {legal.name}
                            </Option>
                        )}
                    </Select>
                            </div>

                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            color="blue"
                            label="Введите название"
                        />

                        <Input
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            color="blue"
                            label="Введите адрес"
                        />

                        <Input
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            color="blue"
                            label="Введите телефон"
                        />

                        <Input
                            value={site}
                            onChange={e => setSite(e.target.value)}
                            color="blue"
                            label="Введите сайт"
                        />


                        <Input
                            value={latitude}
                            onChange={e => setLatitude(Number(e.target.value))}
                            color="blue"
                            input type="number"
                            step="any"
                            label="Введите широту"
                        />

                        <Input
                            value={longitude}
                            onChange={e => setLongitude(Number(e.target.value))}
                            color="blue"
                            input type="number"
                            step="any"
                            label="Введите долготу"
                        />

                        <Input
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            color="blue"
                            input type="number"
                            label="Введите стоимость"
                        />

                        <Input
                            value={amount}
                            onChange={e => setAmount(Number(e.target.value))}
                            color="blue"
                            input type="number"
                            label="Введите количество"
                        />

                        <Input
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            color="blue"
                            label="Введите страну"
                        />

                    <Form.Control
                        type="file"
                        onChange={selectFile}
                    />

                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новую характеристику
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addSanator}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateSanator;
