import { userConstants } from "../actions/constants";

const initState = {
  error: null,
  message: "",
  loading: false,
  error: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_SIGNUP_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_SIGNUP_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_SIGNUP_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action?.payload?.error,
        error: action.payload.error,
      };
      break;
    default:
      return state;
  }

  return state;
};

export default userReducer;
