import {
  loadOrders,
  loadSearchOrders,
  loadSingleData,
  editSingleData,
  orderProduct
} from '../services/OrderService';

export const loadOrderUser = (page) => {
  return (dispatch) => {
    loadOrders(page).then((res) => {
      dispatch({type:'LOAD_ORDERS', res});
    },
    error => {
      dispatch({type:'FETCH_ORDER_ERROR', error})
    })
  }
}

export const loadSearchOrderUser = (search_content, page) => {
  return (dispatch) => {
    loadSearchOrders(search_content, page).then((res) => {
      dispatch({type:'LOAD_ORDERS_SEARCH', res});
    },
    error=>{
      dispatch({type:'FETCH_ORDER_ERROR', error})
    })
  }   
}

export const loadSingleDataUser = (id) => {  
  return (dispatch) => {
    loadSingleData(id).then((res) => {
      console.log(res)
      dispatch({type:'LOAD_SINGLE_DATA', res});
    },
    error => {
      dispatch({type:'FETCH_SINGLE_DATA_ERROR', error})
    })
  }
}

export const updateOrderUser = (credentials, id) => {
  return (dispatch) =>{
    dispatch({type:'RESTART_ADD_UPDATE_RESPONSE'});
    dispatch({type:'LOADING'});
    editSingleData(credentials, id).then((res) => {
      dispatch({type:'UPDATE_ORDER_SUCCESS', res})
    },
    error => {
      dispatch({type:'UPDATE_ORDER_CODE_ERROR', error});
    })
  }
}

export const orderProductUser = (credentials, id) => {
  return (dispatch) => {
    dispatch({type:'RESTART_ADD_UPDATE_RESPONSE'});
    dispatch({type:'LOADING'});

    orderProduct(credentials, id).then((res) => {
      dispatch({type:'ORDERED_SUCCESSFULLY', res})
    },
    error => {
      dispatch({type:'ORDER_ERROR', error});
    })
  }
}