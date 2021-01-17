import React, { Component } from 'react';
import './Leads.css';
import {NavLink} from "reactstrap";
import {Link} from "react-router-dom";
export class Leads extends Component {
    static displayName = Leads.name;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
            stage1 : [],
            stage2 : [],
            stage3 : []
        };
    }
    componentDidMount() {
        fetch('http://localhost:3001/orders')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        orders: result,
                    });
                    this.splitforstage(result);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    splitforstage(orders){
        const stage1s = [];
        const stage2s=[];
        const stage3s=[];
        orders.forEach(function(item, i) {
            if(item.stage=="1"){
                stage1s.push(item);
            }else if(item.stage=="2"){
                stage2s.push(item);
            }else if(item.stage=="3"){
                stage3s.push(item);
            }
        });
        this.setState({
            stage1: stage1s,
            stage2: stage2s,
            stage3: stage3s,
        })
    }

    render() {
        const {error, isLoaded, orders,stage1,stage2,stage3} = this.state;
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
                    <div className="row">
                        <div className="col">
                            <div className="notworked">Необработанные лиды</div>
                            {stage1.map(stage =>
                                <div className="card mt-3">
                                    <img className="card-img-top"
                                         alt=""/>
                                    <div className="card-body">
                                        <h4 className="card-title">{stage.name}</h4>
                                        <p className="card-text">
                                            Описание: {stage.discription}<br/>
                                            Описание товара: {stage.informaprod}<br/>
                                            Предполагаемая цена: {stage.price} Р.
                                        </p>
                                        <NavLink tag={Link} to={`/setorders/${stage.id}`}>
                                        <a href="" className="btn btn-primary">Постановка задачи</a>
                                        </NavLink>
                                    </div>
                                </div> )}
                        </div>
                        <div className="col">
                            <div className="working">В работе</div>
                            {stage2.map(stage =>
                                <div className="card mt-3">
                                    <img className="card-img-top"
                                         alt=""/>
                                    <div className="card-body">
                                        <h4 className="card-title">{stage.name}</h4>
                                        <p className="card-text">
                                            Описание: {stage.discription}<br/>
                                            Описание товара: {stage.informaprod}<br/>
                                            Предполагаемая цена: {stage.price} Р.
                                        </p>
                                        <NavLink tag={Link} to={`/qprogress/${stage.id}`}>
                                        <a href="" className="btn btn-primary">Прогресс задания</a>
                                        </NavLink>
                                    </div>
                                </div> )}
                        </div>
                        <div className="col">
                            <div className="compliting">Завершение</div>
                            {stage3.map(stage =>
                                <div className="card mt-3">
                                    <img className="card-img-top"
                                         alt=""/>
                                    <div className="card-body">
                                        <h4 className="card-title">{stage.name}</h4>
                                        <p className="card-text">
                                            Описание: {stage.discription}<br/>
                                            Описание товара: {stage.informaprod}<br/>
                                            Предполагаемая цена: {stage.price} Р.
                                        </p>
                                        <a href="" className="btn btn-primary">Изменить</a>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Leads;