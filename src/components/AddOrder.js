import React from 'react';
import {SelectClient} from "./SelectClient";
import {Footer} from "./Footer";
import {Header} from "./Header";
import {SelectItem} from "./SelectItem";


class AddOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            client: '',
            item: '',
            description: '',

            clientId: '',
            itemId: '',
            onAddedTextShow: true,
            addedOrderId: '',

        }
    }

    clickAddButton = () => {
        Promise.all([this.sendRequest()]).then(([order]) => {
            this.setState({addedOrderId: order.id});

            this.clearAllAfterAdded();
            this.setState({onAddedTextShow: false});
        });
    };

    clearAllAfterAdded = () => {
        this.setState({client: ''});
        this.setState({clientId: ''});
        this.setState({item: ''});
        this.setState({description: ''});
    };

    sendRequest = () => {
        return fetch("http://localhost:8080/RDBA/v1/orders/", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "client": {
                    "id": this.state.clientId,
                },
                "item": {
                    "id": this.state.itemId,
                },
                "description": this.state.description
            }),

        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            return data;
        });
    };

    onChangeClient = (e) => {
        this.setState({client: e});
    };

    onChangeItem = (e) => {
        this.setState({item: e});
    };

    onChangeDescription = (e) => {
        this.setState({description: e.currentTarget.value});
    };

    onSelectClientIdChange = (value, value2) => {
        this.setState({clientId: value});
        this.onChangeClient(value2);
    };

    onSelectItemIdChange = (id, itemIname) => {
        this.setState({itemId: id});
        this.onChangeItem(itemIname);
    };

    onChangeDescription = (e) => {
        this.setState({description: e.currentTarget.value});
    };

    onValidateAddOrderButton = (e) => {
        const {description, clientId, itemId} = this.state;
        if (description.trim() && clientId && itemId) {
            return true;
        }
        return false;
    };

    onValidateAddedText = (e) => {
        return this.state.onAddedTextShow;
    };


    render() {
        const {client, item, description, addedOrderId} = this.state;

        return (
            <div className='bg-light'>

                <Header/>

                <div className='container'>

                    <div className='add'>

                        <div className='form-inline'>
                            {/*<label className='mb-3'>Client:</label>*/}
                            <input className='form-control col mb-2' type='text' placeholder='Select a client' readOnly
                                   value={client} onChange={this.onChangeClient}/>
                            <SelectClient onSelectClientIdChange={this.onSelectClientIdChange}/>
                        </div>

                        <div className='form-inline'>
                            <input className='form-control col mb-2' type='text' placeholder='Select a item' readOnly
                                   value={item}
                                   onChange={this.onChangeItem}/>
                            <SelectItem onSelectItemIdChange={this.onSelectItemIdChange}/>
                        </div>

                        <div className='form-inline'>
                            <label className='col-form-label mb-2'>Description:</label>
                            <input className='form-control col mb-2' type='text'
                                   placeholder='Enter a description of the task' value={description}
                                   onChange={this.onChangeDescription}/>
                        </div>

                        <div className='form-inline'>
                            <button className='btn btn-primary col' onClick={this.clickAddButton}
                                    disabled={!this.onValidateAddOrderButton()}>Add a new task
                            </button>
                        </div>

                    </div>

                </div>

                <div className='container w-50 text-center bg-success' hidden={this.onValidateAddedText()}>
                    New order added. New ID={addedOrderId}.
                </div>

                <Footer/>
            </div>

        )
    }
}

export {AddOrder}