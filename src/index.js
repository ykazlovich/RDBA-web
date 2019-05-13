import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './css/bootstrap.css';
import './css/bootstrap-grid.css';
import {BrowserRouter} from 'react-router-dom';
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import {AddOrder} from "./components/AddOrder";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact component={App} path="/"/>
                <Route exact path="/add" component={AddOrder}/>
            </Switch>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
