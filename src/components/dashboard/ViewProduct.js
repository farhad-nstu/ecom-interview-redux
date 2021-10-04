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
import {loadProductUser, loadSearchProductUser } from '../../store/actions/ProductActions'


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

    loadEditpage = (e,id) => {
      this.props.history.push('/dashboard/edit-contact/'+id);
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

          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Product Image</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>            
                <TableCell align="right" >edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadProducts && loadProducts.hasOwnProperty('data')? loadProducts.data.data.map(row => (
                <TableRow key={row.id }>

                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell align="right">
                  <img src={loadProducts.file_directory+"/"+row.picture} width={50} height={50} />
                </TableCell>

                <TableCell align="right">{row.price}</TableCell>

                <TableCell align="right">{row.quantity}</TableCell>
              
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    id={row.id}
                    onClick={(e) => this.loadEditpage(e, row.id)}
                  />
                </TableCell>
              </TableRow>
            ))
            :null
            }
            </TableBody>
          </Table>

          {loadProducts? 
            <Pagination defaultPageSize={2} current={loadProducts.data.current_page}
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
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct)



