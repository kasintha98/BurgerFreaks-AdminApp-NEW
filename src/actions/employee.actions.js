import axios from "../helpers/axios";
import { employeeConstants } from "./constants";
import { toast } from "react-toastify";

//action to get employee users from the database
export const getEmployees = () => {
  return async (dispatch) => {
    dispatch({ type: employeeConstants.GET_EMPLOYEE_REQUEST });

    try {
      const res = await axios.get("/employee/getemployees");
      console.log(res);

      if (res.status === 200) {
        const { employees } = res.data;

        dispatch({
          type: employeeConstants.GET_EMPLOYEE_SUCCESS,
          payload: { employees: employees },
        });
        return res.data;
      } else {
        dispatch({
          type: employeeConstants.GET_EMPLOYEE_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
        throw new Error(res.data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data.error || "Something went wrong!");
      dispatch({
        type: employeeConstants.GET_EMPLOYEE_FAILURE,
        payload: {
          error: error?.response?.data.error,
        },
      });
      throw new Error(error?.response?.data.error || "Something went wrong!");
    }

  };
};
