import React, {createContext} from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import UserStore  from './Store/UserStore'
import SanatorStore from "./Store/SanatorStore";
import './index.css';
import { ScrollRestoration } from "react-router-dom";

export const Context = createContext(null)

const rootElement = document.getElementById('root') ;

const root = createRoot(rootElement); // createRoot(container!) if you use TypeScript
console.log(process.env.REACT_APP_API_URL)
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        sanator: new SanatorStore()
    }}>
        <App />
    </Context.Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

