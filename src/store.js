import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productsReducers";
import { cartReducer } from "./reducers/cartReducers";
import { orderReducer } from "./reducers/orderReducerss";

import { userDetailsReducer, userSigninReducer, userSignupReducer,userUpdateProfileReducer } from "./reducers/userReducer";

const initialState = {   userSignin: {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,}};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
    userSignin: userSigninReducer,
    userSignup: userSignupReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;