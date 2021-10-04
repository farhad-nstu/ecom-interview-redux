import {
  addNewContact,
  loadProducts,
  loadSearchProducts,
  loadSingleData
  ,editSingleData,
  orderProduct
} from '../services/ProductService';

export const addContactUser = (credentials) =>{
    return (dispatch) =>{
        dispatch({type:'RESTART_ADD_UPDATE_RESPONSE'});
        dispatch({type:'LOADING'});
       addNewContact(credentials).then((res)=>{
            console.log(res);
                dispatch({type:'NEW_CONTACT_SUCCESS',res})
        },
        error=>{
            dispatch({type:'NEW_CONTACT_CODE_ERROR',error});
        }
        
        )
    }
} 

export const loadProductUser = (page) => {
  return (dispatch) => {
    loadProducts(page).then((res) => {
      dispatch({type:'LOAD_PRODUCTS', res});
    },
    error => {
      dispatch({type:'FETCH_PRODUCT_ERROR',error})
    })
  }
}

export const loadSearchProductUser = (search_content, page) => {
  return (dispatch) => {
    loadSearchProducts(search_content, page).then((res) => {
      console.log(res)
      dispatch({type:'LOAD_PRODUCTS_SEARCH', res});
    },
    error=>{
      dispatch({type:'FETCH_PRODUCT_ERROR',error})
      console.log(error)
    })
  }   
}

export const loadSingleDataUser= (id) =>{
    
    return (dispatch) =>{
        loadSingleData(id).then((res)=>{
            console.log(res)
            dispatch({type:'LOAD_SINGLE_DATA',res});
        },
        error=>{
            dispatch({type:'FETCH_SINGLE_DATA_ERROR',error})
            console.log(error)
        }    
        )
    }
}

export const editContactUser = (credentials,id) =>{
    return (dispatch) =>{
        dispatch({type:'RESTART_ADD_UPDATE_RESPONSE'});
        dispatch({type:'LOADING'});
      editSingleData(credentials,id).then((res)=>{
            console.log(res);
                dispatch({type:'UPDATE_CONTACT_SUCCESS',res})
        },
        error=>{
            dispatch({type:'UPDATE_CONTACT_CODE_ERROR',error});
        }
        
        )
    }
}

export const orderProductUser = (id) => {
  return (dispatch) => {
    orderProduct(id).then((res) => {
        dispatch({type:'ORDERED_SUCCESSFULLY', res})
    },
    error => {
      dispatch({type:'ORDER_ERROR', error});
    })
  }
}