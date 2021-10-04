import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import ProductReducer from './ProductReducer'
import CategoryReducer from './CategoryReducer'

const RootReducer = combineReducers({
    auth:AuthReducer,
    product:ProductReducer,
    category: CategoryReducer
})

export default RootReducer