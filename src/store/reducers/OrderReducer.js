const initState = {
  orderResponse:null,
  loadOrders:null,
  loadSingleOrder:null
};
 

const OrderReducer = (state = initState, action) => {
  switch(action.type){

    case 'RESTART_ADD_UPDATE_RESPONSE':
      return {
        ...state,
        orderResponse:null
      }

    case 'LOADING':
      return {
        ...state,
        orderResponse:'loading...'
      }

    case 'CLEAR_ORDERS_STATE':
      return {
        ...state,
        loadOrders:null
      }

    case 'LOAD_ORDERS':
      return {
        ...state,
        loadOrders:action.res
      }

    case 'LOAD_ORDERS_SEARCH':
      return{
        ...state,
        loadOrders:action.res
      }

    case 'FETCH_ORDER_ERROR':
      return{
        ...state,
        loadOrders:action.error
      }

    case 'LOAD_SINGLE_DATA':
      return{
        ...state,
        loadSingleOrder:action.res
      }

    case 'FETCH_SINGLE_DATA_ERROR':
      return{
        ...state,
        loadSingleOrder:action.error
      }

    case 'UPDATE_ORDER_SUCCESS':
      return{
        ...state,
        orderResponse: action.res.message
      }
                  
    case 'UPDATE_ORDER_CODE_ERROR':
      return {
        ...state,
        orderResponse:action.error
      }

    case 'LOAD_EDIT_ORDERS':
      return {
        ...state,
        loadEditOrders:action.res
      }

    case 'FETCH_EDIT_ORDER_ERROR':
      return{
        ...state,
        loadEditOrders:action.error
      }

    case 'ORDER_DELETE_SUCCESSFULLY':
      let { loadOrders } = state;
      let data = loadOrders.data.data.filter(items => items.id !== action.res.id);
      loadOrders.data.data = [];
      data.map((mappingData) => {
        loadOrders.data.data.push({
          "id": mappingData.id,
          "name": mappingData.name,
          "price": mappingData.product_price, 
          "picture": mappingData.picture,
          "product_quantity": mappingData.product_quantity,
          "shipping_address": mappingData.shipping_address,
          "file_directory": mappingData.file_directory,
        })
      })
      return{
        ...state,
        loadOrders: {...state.loadOrders, loadOrders}
      }                              
                    
    case 'ORDER_DELETE_ERROR':
      return {
        ...state,
        orderResponse:action.error
      }

    default:
      return state

  }    
}

export default OrderReducer;