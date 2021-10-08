import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import ProductReducer from './ProductReducer'
import OrderReducer from './OrderReducer'

const RootReducer = combineReducers ({
  auth: AuthReducer,
  product: ProductReducer,
  order: OrderReducer,
})

export default RootReducer