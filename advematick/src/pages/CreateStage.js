import React, { Component } from 'react';
import './Setorders.css';
import {NavLink} from "reactstrap";
import {Link} from "react-router-dom";
const axios = require('axios');

export class CreateStage extends Component {
    static displayName = CreateStage.name;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            order: [],
            id_orders: props.match.params.id,
            discription:'',
            price:'',
            stage:props.match.params.stage,
            lust_id:0,
        };
        this.handleChangediscription = this.handleChangediscription.bind(this);
        this.handleChangeprice = this.handleChangeprice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch(`http://localhost:3001/orders_progress_lust`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        lust_id: result,
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    handleChangediscription(event) {
        this.setState({discription: event.target.value});
    }
    handleChangeprice(event) {
        this.setState({price: event.target.value});
    }
    handleSubmit(event) {
        axios.post(`http://localhost:3001/orders_progress/add`,{
                Stage: this.state.stage,
                Price: this.state.price,
                Discription: this.state.discription,
                Orders_id: this.state.id_orders,
                Lust_id: (this.lust_id + 1).toString(),
            }
        );
        event.preventDefault();
    }

    /*<table className="table table-borderless col-md-4 pt-3">
                            <thead>
                                <tr className='tr-m'>
                                    <th className="align-middle">  <img className="logo" src="" alt=""/> </th>
                                    <th className="align-middle">{}</th>
                                    <th className="align-middle">
                                       discription<br/>
                                    </th>
                                </tr>
                            </thead>
                        </table>*/
   /* componentDidMount() {
        const {id} = this.state;
        fetch(`http://localhost:3001/orders/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        order: result,
                        orderName:result.name,
                        discription:result.discription,
                        informofprod:result.informaprod,
                        price:result.price,
                        datestart:result.date_start,
                        dateend:result.date_end,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }*/

    render() {
        const {error, isLoaded,} = this.state;
        if (error) {
            return (
                <div className="col">
                    Error: {error.message}
                </div>
            );
        } else if (!isLoaded) {
            return (
                <div className="col">
                    Loading...
                </div>
            );
        } else {
            return (
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group pt-5">
                            <label htmlFor="formGroupExampleInput2">Бюджет, ₽</label>
                            <input type="number" className="form-control" id="formGroupExampleInput2"
                                   placeholder="" value={this.state.price} onChange={this.handleChangeprice}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput2">Описание</label>
                            <textarea className="form-control" id="formGroupExampleInput2" rows="10"
                                   placeholder="" value={this.state.discription} onChange={this.handleChangediscription}/>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example" id="m">
                            <NavLink>
                                <input type="submit" className="btn btn-primary" id="save" onClick="this.disabled=true" value="Сохранить"/>
                            </NavLink>
                            <NavLink tag={Link} to={`/qprogress/${this.state.stage}`}>
                                <button type="button" className="btn btn-primary" id="cancel">Назад</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            );
        }
    }
}
export default CreateStage;