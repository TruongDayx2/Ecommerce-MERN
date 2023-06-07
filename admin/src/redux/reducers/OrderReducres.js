import {
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_EDIT_REQUEST,
  ORDER_EDIT_SUCCESS,
  ORDER_EDIT_RESET,
  ORDER_EDIT_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_RESET,
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_FAIL,
  ORDER_CANCEL_RESET,
} from "../constants/OrderConstants";

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload.data };
    case ORDER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload.data };
    default:
      return state;
  }
};

// Order Details
export const orderDetailsReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

// Order Edit
export const orderEditReducer = (state = { order: {reviews: []} }, action) => {
  switch (action.type) {
    case ORDER_EDIT_REQUEST:
      return { ...state, loading: true };
    case ORDER_EDIT_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_EDIT_RESET:
      return { order: {} };
    case ORDER_EDIT_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

// Order Update
export const orderUpdateReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_UPDATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_UPDATE_RESET:
      return { order: {} };
    case ORDER_UPDATE_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

    


// ORDER DELIVERED
export const orderDeliveredReducer = (state = {loading: true}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { ...state, loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return { ...state, loading: false };
    case ORDER_DELIVERED_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

// ORDER CANCEL
export const orderCancelReducer = (state = {loading: true}, action) => {
  switch (action.type) {
    case ORDER_CANCEL_REQUEST:
      return { ...state, loading: true };
    case ORDER_CANCEL_SUCCESS:
      return { ...state, loading: false };
    case ORDER_CANCEL_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_CANCEL_RESET:
      return {};
    default:
      return state;
  }
}
