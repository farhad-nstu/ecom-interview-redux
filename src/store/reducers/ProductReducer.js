const initState = {
  productResponse:null,
  loadProducts:null,
  loadSingleProduct:null
};
 

const ProductReducer = (state = initState, action) => {
  switch(action.type){

    case 'RESTART_ADD_UPDATE_RESPONSE':
      return {
        ...state,
        productResponse:null
      }

    case 'LOADING':
      return {
        ...state,
        productResponse:'loading...'
      }

    case 'NEW_PRODUCT_SUCCESS':
      return{
        ...state,
        productResponse: action.res.message
      }

    case 'NEW_PRODUCT_CODE_ERROR':
      return {
        ...state,
        productResponse:action.error
      }

    case 'CLEAR_PRODUCTS_STATE':
      return {
        ...state,
        loadProducts:null
      }

    case 'LOAD_PRODUCTS':
      return {
        ...state,
        loadProducts:action.res
      }

    case 'LOAD_PRODUCTS_SEARCH':
      return{
        ...state,
        loadProducts:action.res
      }

    case 'LOAD_FILTER_PRODUCTS':
      return{
        ...state,
        loadProducts:action.res
      }

    case 'FETCH_PRODUCT_ERROR':
      return{
        ...state,
        loadProducts:action.error
      }

    case 'LOAD_SINGLE_DATA':
      return{
        ...state,
        loadSingleProduct:action.res
      }

    case 'FETCH_SINGLE_DATA_ERROR':
      return{
        ...state,
        loadSingleProduct:action.error
      }

    case 'ORDERED_SUCCESSFULLY':
      return{
        ...state,
        productResponse: action.res.message
      }
                                              
    case 'ORDER_ERROR':
      return {
        ...state,
        productResponse: action.error
      }

    default:
      return state

  }    
}

export default ProductReducer;