import axios from "../helpers/axios";
import { userConstants } from "./constants";
import { toast } from "react-toastify";

//action to signup
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_SIGNUP_REQUEST });

    try {
      //post request from front end to signin with the data from frontend
      const res = await axios.post(`/admin/signup`, {
        ...user,
      });

      //if respond is 201 (user successfully signup)
      if (res.status === 201) {
        const { message } = res.data;

        dispatch({
          type: userConstants.USER_SIGNUP_SUCCESS,
          payload: {
            message,
          },
        });
      } else {
        dispatch({
          type: userConstants.USER_SIGNUP_FAILURE,
          payload: { error: res.data.error },
        });
        toast.error(res.data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data.error || "Something went wrong!");
      dispatch({
        type: userConstants.USER_SIGNUP_FAILURE,
        payload: { error: error?.response?.data.error },
      });
    }

  };
};
