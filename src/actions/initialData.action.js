import axios from "../helpers/axios";
import {
  categoryConstants,
  productConstants,
  orderConstants,
} from "./constants";
import { toast } from "react-toastify";

//get all categories, products and orders initially after login
export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post("/initialData");

    try {
      if (res.status === 200) {
        const { categories, products, orders } = res.data;
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
          payload: { categories },
        });
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
      }else{
        toast.error("Something went wrong!");
      }
      console.log(res);
    } catch (error) {
      toast.error(error?.response?.data.error || "Something went wrong!");
    }

  };
};
