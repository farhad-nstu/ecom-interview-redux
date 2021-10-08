import React , {useEffect} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import  useStyles from '../layout/dashboard/GeneralJSXstyling'
import Sidebar from '../layout/dashboard/Sidebar'
import '../layout/dashboard/dashboard.css'
import {Switch,Route} from 'react-router-dom'
import ViewProduct from '../components/dashboard/ViewProduct'
import ProductDetails from '../components/dashboard/ProductDetails'
import ViewOrders from '../components/dashboard/ViewOrders'
import EditOrder from '../components/dashboard/EditOrder'
import EditHistory from '../components/dashboard/EditHistory'
import {useDispatch} from 'react-redux';
import {resetAuthResponsePerComponent} from '../store/actions/AuthAction';


const Dashboard = (props)=>{
     const classes = useStyles();
     const theme = useTheme();
      const dispatch = useDispatch();

    useEffect(() => {
      dispatch(resetAuthResponsePerComponent())
    }, [dispatch])


  return (
      <div>
    
   <Sidebar props={props}/>
         <div className="main-content">
         <main className={classes.content}>
        <div className={classes.toolbar} />
        
        <Switch>
    <Route exact path={props.match.path} component={ViewProduct} />
    <Route exact path={`${props.match.path}/view-products`}  component={ViewProduct} />
    <Route exact path={`${props.match.path}/product-details/:id`}  component={ProductDetails} />
    <Route exact path={`${props.match.path}/view-orders`} component={ViewOrders} />
    <Route exact path={`${props.match.path}/edit-order/:id`} component={EditOrder} />
    <Route exact path={`${props.match.path}/edit-history/:id`} component={EditHistory} />
    </Switch>
        

      </main>
         </div>
      
      </div>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};





export default Dashboard;
