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
import {loadOrderUser, loadSearchOrderUser, orderProductUser } from '../../store/actions/OrderActions'


  class ViewOrders extends Component {

    constructor(props)
    {
      super(props)
      this.state = {
        search_content:""
      }
    }

    componentDidMount = () => {
      const page = "";
      this.props.loadOrderUser(page);
    }

    handleKeyUp = async (e) => {
      await  this.setState({
        [e.target.id] : e.target.value
      })

      if(this.state.search_content == "") {

      } else {
        let page ="";
        this.props.loadSearchOrderUser(this.state.search_content, page);
      }
    }

    onChange = (currentPage) => {
      if(this.state.search_content == "") {
        this.props.loadOrderUser(currentPage)
      } else {
        this.props.loadSearchOrderUser(this.state.search_content, currentPage)
      }     
    }

    loadEditPage = (e, id) => {
      this.props.history.push('/dashboard/edit-order/'+id);
    }

    render() {

      const {loadOrders} = this.props;   

      return (
        <div>

          <TextField
            id="search_content"
            label="search"
            style={{ margin: 8,maxWidth:1000 }}
            placeholder="enter status"
            fullWidth
            margin="normal"
            required
            onKeyUp={this.handleKeyUp}
          />

          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>      
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Shipp Address</TableCell>   
                <TableCell align="right">Status</TableCell>   
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>  
                <TableCell align="right">Shipp Cost</TableCell>
                <TableCell align="right">Total Price</TableCell>
                <TableCell align="right" >Manage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadOrders && loadOrders.hasOwnProperty('data')? loadOrders.data.data.map(row => (
                <TableRow key={row.id }>

                <TableCell component="th" scope="row">
                  {row.name} <br></br>
                  <img src={loadOrders.file_directory+"/"+row.picture} width={50} height={50} />
                </TableCell>

                <TableCell align="right">{row.order_date}</TableCell>
                <TableCell align="right">{row.shipping_address}</TableCell>
                <TableCell align="right">{row.order_status}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.product_quantity}</TableCell>
                <TableCell align="right">{row.shipping_cost}</TableCell>
                <TableCell align="right">{row.net_price}</TableCell>

                <TableCell align="right">
                  {row.order_status && (row.order_status == 'approved' || row.order_status == 'rejected') ? null :
                    <Button
                      variant="contained"
                      color="primary"
                      id={row.id}
                      onClick={(e )=> this.loadEditPage(e, row.id)}
                    >
                      Edit
                    </Button>
                  }
                </TableCell>
              </TableRow>
            ))
            :null
            }
            </TableBody>
          </Table>

          {loadOrders? 
            <Pagination defaultPageSize={2} current={loadOrders.data.current_page}
              className="pagination-restyle"
              total={loadOrders.data.total} 
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

const mapStateToProps = (state)=> {
  return{
    loadOrders: state.order.loadOrders
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    loadOrderUser: (page) => dispatch(loadOrderUser(page)),
    loadSearchOrderUser :(search_content, page) => dispatch(loadSearchOrderUser(search_content, page)),
    orderProductUser: (id) => dispatch(orderProductUser(id))
  }   
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders)