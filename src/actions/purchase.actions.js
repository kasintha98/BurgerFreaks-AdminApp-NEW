import axios from "../helpers/axios";
import { purchaseConstants } from "./constants";
import { toast } from "react-toastify";

//action to get all purchases from database
export const getPurchase = () => {
  return async (dispatch) => {
    dispatch({ type: purchaseConstants.GET_PURCHASE_REQUEST });

    try {
      const res = await axios.get("/purchase");
      console.log(res);

      if (res.status === 200) {
        const { purchase } = res.data;

        dispatch({
          type: purchaseConstants.GET_PURCHASE_SUCCESS,
          payload: { purchase: purchase },
        });
        return res.data;
      } else {
        toast.error("Something went wrong!");
        dispatch({
          type: purchaseConstants.GET_PURCHASE_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
        throw new Error(res.data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data.error || "Something went wrong!");
      dispatch({
        type: purchaseConstants.GET_PURCHASE_FAILURE,
        payload: {
          error: error?.response?.data.error,
        },
      });
      throw error;
    }

  };
};

//action to add a purchase
export const addPurchase = (form) => {
  return async (dispatch) => {
    dispatch({ type: purchaseConstants.ADD_PURCHASE_REQUEST });

    try {
      const res = await axios.post("/purchase/add", form);
      if (res.status === 201) {
        dispatch({
          type: purchaseConstants.ADD_PURCHASE_SUCCESS,
          payload: { purchase: res.data.purchase },
        });
        dispatch(getPurchase());

        toast.success(res.data.msg, {
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
        dispatch({
          type: purchaseConstants.ADD_PURCHASE_FAILURE,
          payload: res.data.error,
        });
        toast.error(res.data.error || "Something went wrong!");
        throw new Error(res.data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data.error || "Something went wrong!");
      dispatch({
        type: purchaseConstants.ADD_PURCHASE_FAILURE,
        payload: error?.response?.data.error,
      });
      throw new Error(error?.response?.data.error || "Something went wrong!");
    }
  };
};

//action to delete a purchase
export const deletePurchase = (id) => {
  return async (dispatch) => {
    dispatch({ type: purchaseConstants.DELETE_PURCHASE_REQUEST });

    try {
      const res = await axios.delete("/purchase/delete/" + id);

      if (res.status === 200) {
        dispatch(getPurchase());
        dispatch({
          type: purchaseConstants.DELETE_PURCHASE_SUCCESS,
        });

        toast.success(res.data.msg, {
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
          type: purchaseConstants.DELETE_PURCHASE_FAILURE,
          payload: { error: error || "Something went wrong!" },
        });
        toast.error(res.data.error || "Something went wrong!");
        throw new Error(error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      dispatch({
        type: purchaseConstants.DELETE_PURCHASE_FAILURE,
        payload: { error: error?.response?.data.error },
      });
      throw error;
    }

  };
};
