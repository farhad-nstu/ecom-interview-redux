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
import {loadEditHistoryUser } from '../../store/actions/OrderActions'


  class EditHistory extends Component {

    constructor(props)
    {
      super(props)
    }

    componentDidMount = () => {
      const { id } = this.props.match.params;
      const page = "";
      this.props.loadEditHistoryUser(page, id);
    }

    onChange = (currentPage) => {
      const { id } = this.props.match.params;
      this.props.loadEditHistoryUser(currentPage, id)  
    }

    render() {

      const {loadEditOrders} = this.props;   

      return (
        <div>

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
              </TableRow>
            </TableHead>
            <TableBody>
              {loadEditOrders && loadEditOrders.hasOwnProperty('data')? loadEditOrders.data.data.map(row => (
                <TableRow key={row.id }>

                <TableCell component="th" scope="row">
                  {row.name} <br></br>
                  <img src={loadEditOrders.file_directory+"/"+row.picture} width={50} height={50} />
                </TableCell>

                <TableCell align="right">{row.order_date}</TableCell>
                <TableCell align="right">{row.shipping_address}</TableCell>
                <TableCell align="right">{row.order_status}</TableCell>
                <TableCell align="right">{row.product_price}</TableCell>
                <TableCell align="right">{row.product_quantity}</TableCell>
                <TableCell align="right">{row.shipping_cost}</TableCell>
                <TableCell align="right">{row.net_price}</TableCell>
              </TableRow>
            ))
            :null
            }
            </TableBody>
          </Table>

          {loadEditOrders? 
            <Pagination defaultPageSize={12} current={loadEditOrders.data.current_page}
              className="pagination-restyle"
              total={loadEditOrders.data.total} 
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

const mapStateToProps = (state) => {
  return{
    loadEditOrders: state.order.loadEditOrders
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    loadEditHistoryUser: (page, id) => dispatch(loadEditHistoryUser(page, id)),
  }   
}

export default connect(mapStateToProps, mapDispatchToProps)(EditHistory)