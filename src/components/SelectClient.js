import React from "react";

import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class SelectClient extends React.Component {

    constructor() {
        super();
        this.state = {
            clients: '',
            link: 'http://localhost:8080/RDBA/v1/clients/',
            showModal: false,
            clientsText: new Map(),
            newClientName: '',
            newClientPhone: '',
        }
    }

    onChangeNewClientName = (e) => {
        this.setState({newClientName: e.currentTarget.value});
    };

    onChangeNewClientPhone = (e) => {
        this.setState({newClientPhone: e.currentTarget.value});
    };

    handleOpenModal = (e) => {
        this.setState({showModal: true});
    };

    handleCloseModal = (e) => {
        this.setState({showModal: false});
    };

    onSelectExistingClient = (e) => {
        this.setState(this.props.onSelectClientIdChange(
            e.currentTarget.value,
            this.state.clientsText.get(Number.parseInt(e.currentTarget.value))
        ));
        this.handleCloseModal();
    };

    addNewClient = (e) => {
        Promise.all([this.sendRequest()]).then(([client]) => {
            this.setState(this.props.onSelectClientIdChange(
                client.id,
                client.name
            ));
        });
        this.handleCloseModal();
    };

    sendRequest = () => {
        const {newClientName, newClientPhone} = this.state;
        return fetch("http://localhost:8080/RDBA/v1/clients/", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": newClientName,
                "phone": newClientPhone
            }),

        }).then(function (response) {
            return response.json();

        }).then(function (data) {
            return data;
        });
    };


    componentDidMount() {
        fetch(this.state.link)
            .then(results => {
                return results.json();
            }).then(data => {
            console.log(data);
            let clients = data.map((client) => {
                    this.state.clientsText.set(client.id, client.name);

                    return (
                        <div className="row list-group-item" key={client.id}>
                            <div className='col-1'>{client.id}</div>
                            <div className='col'>{client.name}</div>
                            <div className='col'>{client.phone}</div>
                            <div className='col'>
                                <button className='btn btn-primary' onClick={this.onSelectExistingClient}
                                        value={client.id}>Select
                                </button>
                            </div>
                        </div>


                    )
                }
            );
            this.setState({clients: clients});

        });
    }

    render() {

        return (
            <div>
                <button className='btn btn-primary mb-2 text-light' onClick={this.handleOpenModal}>
                    +
                    <Modal isOpen={this.state.showModal} size='lg'>

                        <ModalHeader className='modal-header'>
                            <button className='btn-primary btn-dark' onClick={this.handleCloseModal}>Close</button>
                        </ModalHeader>

                        <ModalBody className='modal-content modal-cc'>

                            <div className='container'>
                                <div className='form-inline'>
                                    <div className='form-group'>
                                        <label className='mb-3'>Name:</label>
                                        <input className='form-control mb-3' type='text' placeholder=''
                                               onChange={this.onChangeNewClientName}/>
                                        <label className='mb-3'>Phone:</label>
                                        <input className='form-control mb-3' type='text' placeholder=''
                                               onChange={this.onChangeNewClientPhone}/>
                                    </div>
                                    <button className='btn btn-primary mb-3' onClick={this.addNewClient}>Add new
                                    </button>
                                </div>
                            </div>

                            <div className="container">
                                <div className="list-group">
                                    {this.state.clients}
                                </div>
                            </div>

                        </ModalBody>

                        <ModalFooter/>
                    </Modal>
                </button>
            </div>
        );
    }
}

export {SelectClient}