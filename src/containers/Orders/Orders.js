import React, {Component} from 'react';
import axios from '../../axios'
import Order from './Order/order';
import {connect} from 'react-redux'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading:true
    // }

    componentDidMount() {
    //     axios.get("/orders.json")
    //         .then(res => {
    //             const orders =[];
    //             for (let key in res.data){orders.push({...res.data[key], id: key});  }
    //             this.setState({loading:false, orders:orders})
    //         })
    //         .catch(err => {
    //             this.setState({loading:false})
            
    //         })
        // console.log(this.props.token);
        this.props.onFetchingOrders(this.props.token, this.props.userId);
    } 

    render(){
        // console.log(this.state.orders)
        const orders =(
                this.props.orders.map( order => (
                    <Order 
                    key={order.id} 
                    ingredients={order.ingredients}
                    price={+order.price}
                    formData={order.formData}
                    />
                ))
        );
        return(
            <div>
                {this.props.loading ? <Spinner/> : orders}  
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders:state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
} 

const mapDispatchToProps = dispatch =>{
    return{
    onFetchingOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));