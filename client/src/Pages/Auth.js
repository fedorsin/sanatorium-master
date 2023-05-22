import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {useLocation, NavLink, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REG_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import Row from "react-bootstrap/Row";
import {$authHost} from "../http";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data.role)
            user.setIsUser(data.id)
            user.setIsAuth(true)
            history(SHOP_ROUTE)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="justify-content-end mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет акаунта? <NavLink style={{color: '#4169E1'}} to={REG_ROUTE}>Зарегистрироваться!</NavLink>
                            </div>
                            :
                            <div>
                                Уже есть акаунт? <NavLink style={{color: '#4169E1'}} to={LOGIN_ROUTE}>Войти!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                            style={{width: 150}}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
