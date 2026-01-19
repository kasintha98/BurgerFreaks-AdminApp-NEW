import axios from "../helpers/axios";
import { orderConstants } from "./constants";
import { toast } from "react-toastify";

//action to get customer orders from the database
export const getCustomerOrders = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.post("/order/getCustomerOrders");
      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
          payload: { error: error || "Something went wrong!" },
        });
        toast.error(error || "Something went wrong!");
        throw new Error(error || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data.error || "Something went wrong!");
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
        payload: { error: error?.response?.data.error },
      });
      throw new Error(error?.response?.data.error || "Something went wrong!");
    }
  };
};

//action to update order status
export const updateOrder = (payload) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST });

    try {
      const res = await axios.post("order/update", payload);

      if (res.status === 201) {
        dispatch({
          type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS,
        });
        dispatch(getCustomerOrders());
        toast.success("Order status updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
          payload: { error: error || "Something went wrong!" },
        });
        toast.error(error || "Something went wrong!");
        throw new Error(error || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data.error || "Something went wrong!");
      dispatch({
        type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
        payload: { error: error?.response?.data.error },
      });
      throw error;
    }
  };
};
