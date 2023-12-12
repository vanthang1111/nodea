import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productListReducer,productDetailsReducer, productCreateReviewreducer } from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducers";
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./Reducers/UserReducers";
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from "./Reducers/OrderReducers";



const reducer = combineReducers({
    productList: productListReducer,
    productDetails:productDetailsReducer,
    productReviewCreate:productCreateReviewreducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister:userRegisterReducer,
    userDetailsReducer:userDetailsReducer,

    userUpdateProfile :userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,

});

const cartItemsFromLocalStronge = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
:[];
//login
const userInfoFromLocalStronge = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
:null;

//shippingAddress
const shippingAddressFromLocalStronge = localStorage.getItem("shippingAddress")
? JSON.parse(localStorage.getItem("shippingAddress"))
:{};

const initialState ={
    cart:{
        cartItems:cartItemsFromLocalStronge,
        shippingAddress: shippingAddressFromLocalStronge,
    },
userLogin:{userInfo:userInfoFromLocalStronge},
};
const middleware =[thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

);
export default store;