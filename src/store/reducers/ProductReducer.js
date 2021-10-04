const initState = {
  productResponse:null,
  contactMessage:null,
  loadProducts:null,
  loadSingleContacts:null
};
 

const ProductReducer = (state=initState, action) => {
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
                  console.log(action.res)
                  return{
                      ...state,
                      loadSingleContacts:action.res
                  }
                      case 'FETCH_SINGLE_DATA_ERROR':
                          return{
                              ...state,
                              loadSingleContacts:action.error
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
                          case 'DATA_DELETE_SUCCESSFULLY':
                          let { loadProducts } = state;
                          let data = loadProducts.data.data.filter(items=>items.id !==action.res.id);
                          console.log(data);
                          loadProducts.data.data = [];
                          data.map((mappingData)=>{
                              loadProducts.data.data.push({
                                  "id":mappingData.id,
                                  "firstname":mappingData.firstname,
                                  "lastname":mappingData.lastname,
                                  "email":mappingData.email,
                                  "phonenumber":mappingData.phonenumber,
                                  "image_file":mappingData.image_file,
                              })
                          })
                          return{
                              ...state,
                              loadProducts:{...state.loadProducts,loadProducts}
                          }
                              
                  
                             case 'DATA_DELETE_ERROR':
                          return {
                              ...state,
                              productResponse:action.error
                          }
      default:
              return state
  }
      
    
}

export default ProductReducer;