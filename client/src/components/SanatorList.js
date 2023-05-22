import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import SanatorItem from "../components/SanatorItem";

const SanatorList = observer(() => {
    const {sanator} = useContext(Context)

    return (
        <Row className="d-flex">
            {sanator.sanators.map(s =>
                <SanatorItem key={s.id} sa={s}/>
            )}
            </Row>
    );
});

export default SanatorList;
