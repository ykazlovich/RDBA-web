import React, {Component} from 'react';

import './App.css';
import './css/style.css'
import './css/bootstrap.css'
import './css/bootstrap.min.css'
import './css/bootstrap-grid.css'
import './css/bootstrap-grid.min.css'

import {Orders} from './components/Orders'
import {Header} from './components/Header'
import {Footer} from "./components/Footer";


class App extends Component {
    render() {
        return (
            <div className='bg-light'>
                <Header/>
                <Orders/>

                <Footer/>


            </div>
        )
    }
}

export default App;