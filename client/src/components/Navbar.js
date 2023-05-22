import React, {useContext} from 'react';
import {Context} from "../index";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Container} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
  const {user} = useContext(Context)
  const history = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <label style={{color:'white', cursor:"pointer"}} onClick={() => history(SHOP_ROUTE)}>НайдиСанаторий</label>
          {user.isAuth ?
              <Nav className="ml-auto" style={{color: 'white'}}>
                {user.isRole === 'ADMIN' && <Button
                    variant={"outline-light"}
                    onClick={() => history(ORDER_ROUTE)}
                >
                  Избранное
                </Button>}
                {user.isRole === 'ADMIN'?<Button
                    variant={"outline-light"}
                    onClick={() => history(ADMIN_ROUTE)}
                    className="ms-3"
                >
                  Админ панель
                </Button>: <Button
                    variant={"outline-light"}
                    onClick={() => history(BASKET_ROUTE)}
                >
                  Избранное
                </Button> }
                <Button
                    variant={"outline-light"}
                    onClick={() => logOut()}
                    className="ms-3"
                >
                  Выйти
                </Button>
              </Nav>
              :
              <Nav className="ml-auto" style={{color: 'white'}}>
                <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>
              </Nav>
          }
        </Container>
      </Navbar>

  );
});

export default NavBar;
