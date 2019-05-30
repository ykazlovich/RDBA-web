import React from "react";

import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class SelectItem extends React.Component {


    constructor() {
        super();

        this.state = {
            initLink: 'http://localhost:8080/RDBA/v1/items?search=',
            items: '',
            textSearch: '',
            link: 'http://localhost:8080/RDBA/v1/items?search=',
            showModal: false,
            itemsText: new Map(),
            newItemName: '',
            newItemSerialNo: '',
        }
    }

    onChangeNewItemModel = (e) => {
        this.setState({newItemName: e.currentTarget.value});
    };

    onChangeNewItemSerialNumber = (e) => {
        this.setState({newItemSerialNo: e.currentTarget.value});
    };

    handleOpenModal = (e) => {
        this.setState({showModal: true});
    };

    handleCloseModal = (e) => {
        this.setState({showModal: false});
    };

    onSelectExistingItem = (e) => {
        this.setState(this.props.onSelectItemIdChange(
            e.currentTarget.value,
            this.state.itemsText.get(Number.parseInt(e.currentTarget.value))
        ));
        this.handleCloseModal();
    };

    searchTextChange = (e) => {
        const {initLink} = this.state;

        this.setState(
            {
                link: initLink + e.currentTarget.value
            }, function () {
                this.componentDidMount()
            }
        );

    }

    addNewItem = (e) => {
        Promise.all([this.sendRequest()]).then(([item]) => {
            this.setState(this.props.onSelectItemIdChange(
                item.id,
                item.iname
            ));
        });
        this.handleCloseModal();

    };

    sendRequest = () => {
        const {newItemName, newItemSerialNo} = this.state;
        return fetch("http://localhost:8080/RDBA/v1/items/", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "iname": newItemName,
                "serialnumber": newItemSerialNo
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
            let items = data.map((item) => {
                    this.state.itemsText.set(item.id, item.iname);
                    return (
                        <div className="row list-group-item" key={item.id}>
                            <div className='col-1'> {item.id}</div>
                            <div className='col-2'>{item.iname}</div>
                            <div className='col'>{item.serialnumber}</div>
                            <div className='col'>
                                <button className='btn btn-primary' onClick={this.onSelectExistingItem}
                                        value={item.id}>Select
                                </button>
                            </div>
                        </div>
                    )
                }
            );
            this.setState({items: items});
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
                                    <label className='mb-lg-0'>Add a new item:</label>
                                    <div className='form-group'>
                                        <label className='mb-3'>Model:</label>
                                        <input className='form-control mb-3' type='text' placeholder=''
                                               onChange={this.onChangeNewItemModel}/>
                                        <label className='mb-3'>Serial Number:</label>
                                        <input className='form-control mb-3' type='text' placeholder=''
                                               onChange={this.onChangeNewItemSerialNumber}/>
                                    </div>
                                    <button className='btn btn-primary mb-3' onClick={this.addNewItem}>Add new
                                    </button>
                                </div>
                            </div>

                            <div className='container'>
                                <div className='form-group'>
                                    <label className='mb-0'>Search by model or serial number:</label>
                                    <input className='form-control' type='text' onChange={this.searchTextChange}/>

                                </div>
                            </div>

                            <div className="container">
                                <div className="row list-group-item">
                                    <div className='col-1'>ID</div>
                                    <div className='col-2'>Model</div>
                                    <div className='col'>Serial number</div>
                                    <div className='col'>Select</div>
                                </div>
                                {this.state.items}
                            </div>

                        </ModalBody>

                        <ModalFooter/>

                    </Modal>

                </button>

            </div>
        );
    }
}

export {SelectItem}