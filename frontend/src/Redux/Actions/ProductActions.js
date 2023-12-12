import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST,  PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../Constants/ProductConstants";
import axios from"axios";
import { logout } from './userActions';
export const listProduct = (keyword=" ",pageNumber=" ")=> async(dispatch)=>{
    try{
            dispatch({type:PRODUCT_LIST_REQUEST});
            const{data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
            dispatch({type:PRODUCT_LIST_SUCCESS,payload: data});
    }
    catch(error){
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:
            error.response && error.response.data.message ? error.response.data.message
            : error.message,
        });

    }
};

//single product
export const listProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/products/${id}`);
      console.log(data);  // Thêm dòng này để kiểm tra giá trị của data
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // product review create
export const createProductReview = (productId,review) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo || !userInfo.token) {
      throw new Error('User is not authorized');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

     await axios.post(`/api/products/${productId}/review`,review, config);

    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === 'not authorized, token failed') {
      dispatch(logout());
    }

    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};
