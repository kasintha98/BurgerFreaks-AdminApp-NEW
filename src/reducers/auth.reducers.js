import { authConstants } from "../actions/constants";

//initial state of user object
const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    nic: "",
    gender: "",
    email: "",
    fullName: "",
    contactNumber: "",
    address: "",
    username: "",
    role: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  error: null,
  message: "",
};

//check what is the request and returning suitable state for the request
const authReducer = (state = initState, action) => {
  console.log(action);

  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        authenticate: false,
        authenticating: false,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
        loading: false,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action?.payload?.error,
        loading: false,
      };
      break;
    default:
      break;
  }

  return state;
};

export default authReducer;
