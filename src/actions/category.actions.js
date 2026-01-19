import axios from "../helpers/axios";
import { categoryConstants } from "./constants";
import { toast } from "react-toastify";

//actio to get all categories from database
const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

    try {
      const res = await axios.get("category/getcategories");
      console.log(res);

      if (res.status === 200) {
        const { categories } = res.data;

        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
          payload: { categories: categories },
        });
        return res.data;
      } else {
        toast.error("Something went wrong!");
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
        throw new Error(res.data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data.error || "Something went wrong!");
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: {
          error: error?.response?.data.error,
        },
      });
      throw new Error(error?.response?.data.error || "Something went wrong!");
    }

  };
};

//action to add a new category
export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
    try {
      const res = await axios.post("/category/create", form);
      if (res.status === 201) {

        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
        });
        dispatch(getAllCategory());

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
          type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
          payload: res.data.error || "Something went wrong!",
        });
        toast.error(res.data.error || "Something went wrong!");
        throw new Error(res.data.error || "Something went wrong!");
      }
    } catch (error) {
      console.log(error.reponse);
      toast.error(error?.response?.data.error || "Something went wrong!");
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
        payload: error?.response?.data.error || "Something went wrong!",
      });
      throw new Error(error?.response?.data.error || "Something went wrong!");
    }
  };
};

//action to update a category
export const updateCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });

    try {
      const res = await axios.post("/category/update", form);
      if (res.status === 201) {
        dispatch({ type: categoryConstants.UPDATE_CATEGORY_SUCCESS });
        dispatch(getAllCategory());

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
          type: categoryConstants.UPDATE_CATEGORY_FAILURE,
          payload: { error: error || "Something went wrong!" },
        });
        toast.error(res.data.error || "Something went wrong!");
        throw new Error(error || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data.error || "Something went wrong!");
      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_FAILURE,
        payload: { error: error?.response?.data.error },
      });
      throw new Error(error?.response?.data.error || "Something went wrong!");
    }

  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });

    try {
      const res = await axios.delete("category/" + id);

      if (res.status === 200) {
        dispatch(getAllCategory());
        dispatch({
          type: categoryConstants.DELETE_CATEGORY_SUCCESS,
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
          type: categoryConstants.DELETE_CATEGORY_FAILURE,
          payload: { error: error || "Something went wrong!" },
        });

        toast.error(error || "Something went wrong!");
        throw new Error(error || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong!");
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_FAILURE,
        payload: { error: error?.response?.data.error },
      });
      throw new Error(error?.response?.data.error || "Something went wrong!");
    }

  };
};

export { getAllCategory };
