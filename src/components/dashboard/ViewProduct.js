import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Pagination from 'rc-pagination'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import {loadProductUser, loadSearchProductUser, loadFilterProductUser, orderProductUser } from '../../store/actions/ProductActions'


class ViewProduct extends Component {

  constructor(props)
  {
    super(props)
    this.state = {
      search_content:"",
      filter_product:""
    }
  }

  componentDidMount = () => {
    const page = "";
    this.props.loadProductUser(page);
  }

  handleKeyUp = async (e) => {
    await  this.setState({
        [e.target.id] : e.target.value
      })

    if(this.state.search_content == "") {

    } else {
      let page ="";
      this.props.loadSearchProductUser(this.state.search_content, page);
    }
  }

  filterProduct = async (e) => {
    await this.setState({
      [e.target.id] : e.target.value
    })

    if(this.state.filter_product == "") {

    } else {
      let page ="";
      this.props.loadFilterProductUser(this.state.filter_product, page);
    }
  }

  onChange = (currentPage) => {
    if(this.state.search_content == "") {
      this.props.loadProductUser(currentPage)
    } else {
      this.props.loadSearchProductUser(this.state.search_content, currentPage)
    }     
  }

  loadDetailsPage = (e, id) => {
    this.props.history.push('/dashboard/product-details/'+id);
  }

  OrderProduct = (e, id) => {
    const confirmDialog  = window.confirm("are you sure you want to order this product?");
    if(confirmDialog == true) {
      this.props.orderProductUser(id);
    } else {

    }
  }

  render() {

    const {loadProducts} = this.props;   

    return (
      <div>

        <div className="row" style={{ marginBottom: 20 }}>
          <div className="col-sm-6">
            <input type="text" className="form-control" id="search_content" placeholder="search product by name" onKeyUp={this.handleKeyUp} />
          </div>
          <div className="col-sm-6">
            <div className="row">
              <label className="col-sm-4">Filter Product</label>
              <div className="col-sm-8">
                <select id="filter_product" className="form-control" onChange={this.filterProduct}>
                  <option>Filter By Price</option>
                  <option value="lowest">Lowest Price</option>
                  <option value="highest">Highest Price</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row" style={{ marginBottom: 20 }}>
          {loadProducts && loadProducts.hasOwnProperty('data')? loadProducts.data.data.map(row => (
            <div className="col-sm-4">
              <div className="card">
                <a
                  href=""
                  style={{ textDecoration: "none" }}
                  onClick={(e )=> this.loadDetailsPage(e, row.id)}
                >
                  <img src={loadProducts.file_directory+"/"+row.picture} width={200} height={180} />
                  <br></br>
                  <p>BDT {row.price}</p>
                  
                  <h6 style={{ fontWeight: "bold" }}>{row.name}</h6>

                </a>
              </div>
            </div>
          ))
          :null
          }
        </div>

        {loadProducts? 
          <Pagination defaultPageSize={12} current={loadProducts.data.current_page}
            className="pagination-restyle"
            total={loadProducts.data.total} 
            onChange={this.onChange} 
            prevIcon={<ArrowBackIosIcon/>}
            jumpNextIcon={<ArrowForwardIcon/>}
            jumpPrevIcon={<ArrowBackIcon/>}
            nextIcon={<ArrowForwardIosIcon/>}
          />
          : null
        }

      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    loadProducts: state.product.loadProducts
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    loadProductUser: (page) => dispatch(loadProductUser(page)),
    loadSearchProductUser :(search_content, page) => dispatch(loadSearchProductUser(search_content, page)),
    loadFilterProductUser :(filter_product, page) => dispatch(loadFilterProductUser(filter_product, page)),
    orderProductUser: (id) => dispatch(orderProductUser(id))
  }   
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct)