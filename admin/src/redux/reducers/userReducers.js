import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_SUCCESS_RESET,
  USER_LOGOUT,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  PORGOT_PASSWORD_REQUEST,
  PORGOT_PASSWORD_SUCCESS,
  PORGOT_PASSWORD_FAIL,
  PORGOT_PASSWORD_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_RESET
} from "../constants/UserConstants";

// Register
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, register_status: true };
    case USER_REGISTER_SUCCESS_RESET:
      return { loading: false, register_status: false };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


// Login
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// Get Users List
export const userListReducer = (state = { users: [], numOfPages: 0, sortBy: '', searchText: '' }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, users: [] };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload.data, numOfPages: action.payload.numOfPages, sortBy: action.payload.sortBy, searchText: action.payload.searchText };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload.data, numOfPages: action.payload.numOfPages, sortBy: action.payload.sortBy, searchText: action.payload.searchText };
    case USER_LIST_RESET:
      return { users: [], numOfPages: 0, sortBy: '', searchText: '' };
    default:
      return state;
  }
};

// Create User
export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, create_status: true };
    case USER_REGISTER_SUCCESS_RESET:
      return { loading: false, create_status: false };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// Edit User
export const userEditReducer = (state = { user: {reviews: []} }, action) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { ...state, loading: true };
    case USER_EDIT_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_EDIT_RESET:
      return { user: {} };
    case USER_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


// Update User
export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, update_status: true, user: action.payload };
    case USER_UPDATE_RESET:
      return { loading: false, update_status: false };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


// Delete User
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, delete_status: true };
    case USER_REGISTER_SUCCESS_RESET:
      return { loading: false, delete_status: false };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// Get User Details
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// Forgot Password
export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case PORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case PORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case PORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case PORGOT_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
}

// Reset Password
export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
}
