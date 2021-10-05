import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import DefaultImg from '../../img/default-img.png';
import {loadSingleDataUser, orderProductUser} from '../../store/actions/ProductActions';

class ProductDetails extends Component {

  constructor(props) {
    super(props)
    this.state ={
      id: '',
      quantity: '',
      shipping_address: '',
      shipping_cost: '',
    }
  } 

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.loadSingleDataUser(id);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id] :e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    console.log(this.state);
    this.props.orderProductUser(this.state, id);
  }

  render() {
    const {productResponse} = this.props; 

    return (
      <div>

        <h1>Product Details</h1>

        <form   autoComplete="off" onSubmit={this.handleSubmit}>

          <TextField
            id="quantity"
            label="quantity"
            style={{ margin: 8,maxWidth:1000 }}
            placeholder="enter quantity"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            value = {this.state.quantity || ''}
            onChange={this.handleChange}
          />

          <TextField
            id="shipping_address"
            label="shipping_address"
            style={{ margin: 8,maxWidth:1000 }}
            placeholder="enter your shipping_address"
            fullWidth
            margin="normal"
            variant="outlined"
            value= {this.state.shipping_address || ''}
            onChange={this.handleChange}
          />

          <Button variant="contained" type="submit"  style={{width:1000}} color="primary" >
            Confirm Order
          </Button>

          <br/>

          <b>{productResponse != null? productResponse : null}</b>

        </form>    

      </div>
    )

  }

}

const mapStateToProps = (state) => {
  return {
    loadSingleProduct: state.product.loadSingleProduct,
    productResponse: state.product.productResponse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleDataUser: (id) => dispatch(loadSingleDataUser(id)),
    orderProductUser: (credentials, id) => dispatch(orderProductUser(credentials, id))   
  }   
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)