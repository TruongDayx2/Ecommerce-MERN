import {
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_EDIT_REQUEST,
  ORDER_EDIT_SUCCESS,
  ORDER_EDIT_FAIL,
  ORDER_EDIT_RESET,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_RESET,
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_FAIL,
  ORDER_CANCEL_RESET,
  
} from "../constants/OrderConstants";
import { logout } from "./userActions";
import axios from "axios";
import { toast } from "react-toastify";
import {ToastObjects} from "./toastObject";

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const { data } = await axios.get(`/orders`);
    console.log('order',data);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    console.log('payload order',data);
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/orders/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

//Edit Order
export const editOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_EDIT_REQUEST });
    const { data } = await axios.get(`/orders/${id}`);
    dispatch({ type: ORDER_EDIT_SUCCESS, payload: data });
    console.log('payload order',data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        toast.error(message, ToastObjects);
    dispatch({
      type: ORDER_EDIT_FAIL,
      payload: message,
    });
  }
};


// Update Order
export const updateOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_UPDATE_REQUEST });

    const response = await axios.put(
      `/orders/${order._id}`,
      order
    );

    if (!response.data.success) {
        toast.error(response.data.message, ToastObjects);
        dispatch({
          type: ORDER_UPDATE_FAIL,
        });
      } else {
        toast.success(response.data.message, ToastObjects);
        dispatch({ type: ORDER_UPDATE_SUCCESS, payload: response.data });
        dispatch({ type: ORDER_EDIT_SUCCESS, payload: response.data });
      }

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    toast.error(message, ToastObjects);
    dispatch({
      type: ORDER_UPDATE_FAIL,
      payload: message,
    });
  }
};

// Set Order Delivered
export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

    const response = await axios.post(
      `/orders/${orderId}/Delivered`
    );

    const responseData = response.data;

    if (!responseData.success) {
        toast.error(responseData.message, ToastObjects);  
      }else{
        toast.success(responseData.message, ToastObjects);  
        dispatch({ type: ORDER_DELIVERED_SUCCESS});
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: responseData });
        
    }

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: message,
    });
  }
};

//Cancel Order
export const cancelOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CANCEL_REQUEST });

    const response = await axios.post(
      `/orders/${orderId}/Canceled`
    );

    const responseData = response.data;

    if (!responseData.success) {
        toast.error(responseData.message, ToastObjects);
        dispatch({
          type: ORDER_CANCEL_FAIL,
        });
      } else {
        toast.success(responseData.message, ToastObjects);
        dispatch({ type: ORDER_CANCEL_SUCCESS, payload: responseData });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: responseData });
      }

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

        toast.error(message, ToastObjects);
    dispatch({
      type: ORDER_CANCEL_FAIL,
      payload: message,
    });
  }
};

    



// Delete Product
export const deleteOrder = (id) => async (dispatch, getState) => {

  try {
    dispatch({ type: ORDER_DELETE_REQUEST });

    const response = await axios.delete(`/orders/${id}`);

    const responseData = response.data;

    if (!responseData.success) {
        toast.error(responseData.message, ToastObjects);  
      }else{
        toast.success(responseData.message, ToastObjects);  
        dispatch({ type: ORDER_DELETE_SUCCESS });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    toast.error(message, ToastObjects);
    
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: message,
    });
  }
};