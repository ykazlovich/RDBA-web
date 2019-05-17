import React from 'react';
import {DateTimeFormatter, LocalDateTime} from "js-joda";

class Orders extends React.Component {

    constructor() {
        super();
        this.state = {
            orders: [],
            link: 'http://localhost:8080/RDBA/v1/orders/',
        };
    };

    componentDidMount() {
        fetch(this.state.link)
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({orders: data});
        });
    }

    render() {
        return (

            <div className="container">

                <div className="row list-group-item">
                    <div className='col'>Number</div>
                    <div className='col'>Client</div>
                    <div className='col'>Date</div>
                    <div className='col'>Item</div>
                    <div className='col'>Serial number</div>
                    <div className='col'>Description</div>
                    <div className='col'>Edit</div>
                </div>

                <div className="list-group">
                    {this.state.orders.map(order => {
                        let formattedDate = LocalDateTime
                            .parse(order.date)
                            .format(DateTimeFormatter
                                .ofPattern('M/d/yyyy HH:mm'))
                            .toString();
                        return (
                            <div className="row list-group-item" key={order.id}>
                                <div className='col'>{order.id}</div>
                                <div className='col'>{order.client.name}</div>
                                <div className='col'>{formattedDate}</div>
                                <div className='col'>{order.item.iname}</div>
                                <div className='col'>{order.item.serialnumber}</div>
                                <div className='col'>{order.description}</div>
                                <div className='col'><a className='btn btn-primary'
                                                        href={this.state.link + order.id}>Edit</a>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>


        );
    }
}

export {Orders};