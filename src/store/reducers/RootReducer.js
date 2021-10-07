import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import ProductReducer from './ProductReducer'
import OrderReducer from './OrderReducer'
import CategoryReducer from './CategoryReducer'

const RootReducer = combineReducers({
    auth: AuthReducer,
    product: ProductReducer,
    order: OrderReducer,
    category: CategoryReducer
})

export default RootReducer