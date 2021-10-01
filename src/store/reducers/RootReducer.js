import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import ContactReducer from './ContactReducer'
import CategoryReducer from './CategoryReducer'

const RootReducer = combineReducers({
    auth:AuthReducer,
    contact:ContactReducer,
    category: CategoryReducer
})

export default RootReducer