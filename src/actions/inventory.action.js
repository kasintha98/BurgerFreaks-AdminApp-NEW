import axios from "../helpers/axios";
import { inventoryConstants } from "./constants";
import { toast } from "react-toastify";

//get inventory from database
export const getInventory = () => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.GET_INVENTORY_REQUEST });

    try {
      const res = await axios.get("/inventory");
      console.log(res);

      if (res.status === 200) {
        const { inventory } = res.data;

        dispatch({
          type: inventoryConstants.GET_INVENTORY_SUCCESS,
          payload: { inventory: inventory },
        });
        return res.data;
      } else {
        toast.error("Something went wrong!");
        dispatch({
          type: inventoryConstants.GET_INVENTORY_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
        throw new Error(res.data.error || "Something went wrong!");
      }
    } catch (error) {
      
      toast.error(error?.response?.data.error || "Something went wrong!");
      dispatch({
        type: inventoryConstants.GET_INVENTORY_FAILURE,
        payload: {
          error: error?.response?.data.error,
        },
      });
      throw error;
    }

  };
};

//action to add inventory to database
export const addInventory = (form) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.ADD_INVENTORY_REQUEST });

    try {
      const res = await axios.post("/inventory/add", form);
      if (res.status === 201) {
        dispatch({
          type: inventoryConstants.ADD_INVENTORY_SUCCESS,
          payload: { inventory: res.data.inventory },
        });
        dispatch(getInventory());
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
          type: inventoryConstants.ADD_INVENTORY_FAILURE,
          payload: res.data.error,
        });
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        throw new Error(res.data.error || "Something went wrong!");
      }
    } catch (error) {
      console.log(error.reponse);
      toast.error("Something went wrong!");
      dispatch({
        type: inventoryConstants.ADD_INVENTORY_FAILURE,
        payload: error?.response?.data.error,
      });
      throw new Error(error?.response?.data.error || "Something went wrong!");
    }
  };
};

//action to delete inventory from database
export const deleteInventory = (id) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.DELETE_INVENTORY_REQUEST });

    try {
      const res = await axios.delete("/inventory/delete/" + id);

      if (res.status === 200) {
        dispatch(getInventory());
        dispatch({
          type: inventoryConstants.DELETE_INVENTORY_SUCCESS,
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
          type: inventoryConstants.DELETE_INVENTORY_FAILURE,
          payload: { error },
        });

        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        throw new Error(error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      dispatch({
        type: inventoryConstants.DELETE_INVENTORY_FAILURE,
        payload: { error: error?.response?.data.error },
      });
      throw error;
    }

  };
};
