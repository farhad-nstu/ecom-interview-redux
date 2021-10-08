import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Pagination from 'rc-pagination'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import {loadProductUser, loadSearchProductUser, orderProductUser } from '../../store/actions/ProductActions'


  class ViewProduct extends Component {

    constructor(props)
    {
      super(props)
      this.state = {
        search_content:""
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

          <TextField
            id="search_content"
            label="search"
            style={{ margin: 8,maxWidth:1000 }}
            placeholder="enter product name"
            fullWidth
            margin="normal"
            required
            onKeyUp={this.handleKeyUp}
          />

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
      )}
    }

const mapStateToProps = (state)=>{
    return{
        loadProducts: state.product.loadProducts
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        loadProductUser: (page) => dispatch(loadProductUser(page)),
        loadSearchProductUser :(search_content,page) => dispatch(loadSearchProductUser(search_content, page)),
        orderProductUser: (id) => dispatch(orderProductUser(id))
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct)