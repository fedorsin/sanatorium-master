import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateCity from "../components/modals/CreateCity";
import CreateSanator from "../components/modals/CreateSanator";
import CreateType from "../components/modals/CreateType";
import CreateLegal from "../components/modals/CreateLegal";
import {observer} from "mobx-react-lite";
import {ORDER_ROUTE} from "../utils/consts";


const Admin = observer( () => {
    const [cityVisible, setCityVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [legalVisible, setLegalVisible] = useState(false)
    const [sanatorVisible, setSanatorVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>

            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setCityVisible(true)}
            >
                Добавить город
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setLegalVisible(true)}
            >
                Добавить агенство
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setSanatorVisible(true)}
            >
                Добавить санаторий
            </Button>
            <CreateCity show={cityVisible} onHide={() => setCityVisible(false)}/>
            <CreateSanator show={sanatorVisible} onHide={() => setSanatorVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateLegal show={legalVisible} onHide={() => setLegalVisible(false)}/>
        </Container>
    );
});

export default Admin;
