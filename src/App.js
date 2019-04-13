import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class Background extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        };
    };


    componentDidMount() {
        fetch('http://localhost:8080/RDBA/orders')
            .then(results => {
                return results.json();
            }).then(data => {
            console.log(data);
            let orders = data.map((order) => {
                    return (
                        <div key={order.id} class="list-group-item">
                            {order.id}
                            {order.client}
                            {order.user.name}
                            {order.date}
                        </div>
                    )
                }
            )
            this.setState({orders: orders});

        });

        // const response = fetch('http://localhost:8080/RDBA/orders');
        // const body = await response.json();
        // this.setState({ orders: body, isLoading: false });
    }

    render() {
        return (
            <div class="list-group">
                {this.state.orders}
            </div>
        );
    }
}

export default Background;