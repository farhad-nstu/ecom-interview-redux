const initState = {
  productResponse:null,
  contactMessage:null,
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
                          case 'UPDATE_CONTACT_SUCCESS':
                              console.log(action);
                              return{
                                  ...state,
                                  productResponse: action.res.message
                               }
                  
                             case 'UPDATE_CONTACT_CODE_ERROR':
                          return {
                              ...state,
                              productResponse:action.error
                          }

    case 'ORDERED_SUCCESSFULLY':
      let { loadProducts } = state;
      let data = loadProducts.data.data;
      console.log(data);
      loadProducts.data.data = [];
      data.map((mappingData) => {
        loadProducts.data.data.push({
          "id": mappingData.id,
          "name": mappingData.name,
          "picture": mappingData.picture,
          "price": mappingData.price,
          "quantity": mappingData.quantity,
        })
      })
      return{
        ...state,
        loadProducts: {...state.loadProducts, loadProducts}
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