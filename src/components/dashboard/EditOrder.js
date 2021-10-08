import React, { Component } from 'react'
import { connect } from 'react-redux';
import {loadSingleDataUser, updateOrderUser} from '../../store/actions/OrderActions';

class ProductDetails extends Component {

  constructor(props) {
    super(props)
    this.state ={
      id: '',
      quantity: '',
      shipping_address: '',
      shipping_cost: '',
      name: '',
      product_quantity: '',
      picture: '',
      price: '',
      file_directory: '',
      description: '',
      inside_outside: ''
    }
  } 

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.loadSingleDataUser(id);
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if(prevProps.loadSingleOrder !== this.props.loadSingleOrder){
      let singleData = this.props.loadSingleOrder;
      this.setState({
        name: singleData.data.name,
        quantity: singleData.data.quantity,
        price: singleData.data.product_price, 
        picture: singleData.data.picture, 
        description: singleData.data.description,
        product_quantity: singleData.data.product_quantity,
        shipping_address: singleData.data.shipping_address,
        file_directory: singleData.file_directory, 
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.updateOrderUser(this.state, id);
  }

  render() {
    const {orderResponse} = this.props; 
    const originalString = this.state.description;
    // const spaceRemoveString = originalString.trim();
    const strippedString = originalString.replace(/<[^>]*>?/gm, '');

    return (
      <div>

        <div className="row">

          <div className="col-sm-6">
            <div className="card">
              <div className="card-header m-1"></div>
              <div className="card-body">
                <h4 className="m-1" style={{fontWeight: "bold"}}>{this.state.name}</h4>
                <div className="mb-1">
                  <img src={this.state.file_directory+"/"+this.state.picture} width={250} height={200} />
                </div>
                <h6 className="mb-1" style={{fontWeight: "bold"}}>
                  {this.state.quantity ? 
                    'Current Stock: ' + this.state.quantity
                    : 'Out of Stock'
                  }
                </h6>
                <p className="mb-1" style={{fontWeight: "bold"}}>BDT {this.state.price}</p>
                <div style={{textAlign: "left", marginTop: 20}} className="border">
                  <h5 className="mb-1" style={{fontWeight: "bold", marginLeft: 10, marginTop: 10}}>Product Details</h5>
                  <p style={{marginLeft: 10, marginTop: 10}}>{strippedString}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6">
            <form   autoComplete="off" onSubmit={this.handleSubmit}>

              <input style={{margin: 10}} type="number" className="form-control" id="product_quantity" onChange={this.handleChange} width="100" value={this.state.product_quantity || ''} />

              <input style={{margin: 10}} type="text" className="form-control" id="shipping_address" onChange={this.handleChange} width="100" value={this.state.shipping_address || ''} />

              <select style={{margin: 10}} id="inside_outside" className="form-control" width="100" onChange={this.handleChange}>
                <option>Inside Dhaka</option>
                <option>Outside Dhaka</option>
              </select>

              <button style={{margin: 10}} className="btn btn-primary" type="submit" color="primary" >
                Confirm Order
              </button>

              <br/>

              <b>{orderResponse != null? orderResponse : null}</b>

            </form>

            <div className="border" style={{ marginTop: 30}}>
              <h5 style={{fontWeight: "bold", marginLeft: 8, marginTop: 15, marginBottom: 15}}>Shipping Cost</h5>
              <div className="row" style={{ marginLeft: 8, marginTop: 10, marginBottom: 10, fontWeight: "bold"}}>Inside Dhaka: BDT 60</div>
              <div className="row" style={{ marginLeft: 8, marginBottom: 10, fontWeight: "bold"}}>Outside Dhaka: BDT 100</div>
            </div>

          </div>

        </div> 

      </div>
    )

  }

}

const mapStateToProps = (state) => {
  return {
    loadSingleOrder: state.order.loadSingleOrder,
    orderResponse: state.order.orderResponse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleDataUser: (id) => dispatch(loadSingleDataUser(id)),
    updateOrderUser: (credentials, id) => dispatch(updateOrderUser(credentials, id))   
  }   
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)