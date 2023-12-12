import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import{userListReducer, userLoginReducer}from './Reducers/UserReducers';
import { productCreateReducer, productDeleteReducer, productEditReducer, productListReducer, productUpdateReducer } from "./Reducers/ProductReducers";
import { orderListReducer } from "./Reducers/OrderReducers";

const reducer = combineReducers({
   
    userLogin: userLoginReducer,
    userList:userListReducer,
    productList:productListReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productEdit:productEditReducer,
    productUpdate:productUpdateReducer,
    orderList:orderListReducer,
    
});


//login
const userInfoFromLocalStronge = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
:null;



const initialState ={
userLogin:{userInfo:userInfoFromLocalStronge},
};
const middleware =[thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

);
export default store;