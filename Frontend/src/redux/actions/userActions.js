import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAIL,
  GET_FAVORITE_REQUEST,
  GET_FAVORITE_SUCCESS,
  GET_FAVORITE_FAIL,
  DELETE_FAVORITE_FAIL,
  DELETE_FAVORITE_REQUEST,
  DELETE_FAVORITE_SUCCESS,
  SEND_NOTIFICATION_REQUEST,
  SEND_NOTIFICATION_SUCCESS,
  SEND_NOTIFICATION_FAIL,
  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAIL,
  GET_REQUEST_REQUEST,
  GET_REQUEST_SUCCESS,
  GET_REQUEST_FAIL,
  UPDATE_PRIVILEDGE_REQUEST,
  UPDATE_PRIVILEDGE_SUCCESS,
  UPDATE_PRIVILEDGE_FAIL,
} from "../constants/userConstants";

import axios from "axios";
import fetcher from "../../utils/fetcher";
import uploader from "../../utils/uploader";

axios.defaults.withCredentials = true;

// Login
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `http://localhost:5000/api/v1/login`,
      { username, password },
      config
    );

    // need to transfer this to seperate function

    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem("user_session", JSON.stringify(data));
    if (data.tokenType) {
      dispatch(loadUser());
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const avatar = userData.get("avatar");

    const data = await fetcher(
      `http://localhost:5000/api/v1/register`,
      "POST",
      userData
    );
    // console.log(data);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    let data = await fetcher(`http://localhost:5000/api/v1/me`, "GET");
    // console.log(data);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    console.error(error);
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    // await axios.get(`http://localhost:5000/api/v1/logout`);

    localStorage.removeItem("user_session");

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    // Handel Image upload
    if (userData.has("avatar")) {
      const file = userData.get("avatar");
      const uniqueUserId = JSON.parse(
        localStorage.getItem("user_session")
      ).username;

      if (file) {
        const response = await uploader(file, "user", uniqueUserId);
        console.log(response);
      }
    }

    const { data } = await axios.put(
      "http://localhost:5000/api/v1/me/update",
      userData,
      config
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `http://localhost:5000/api/v1/password/update`,
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `http://localhost:5000/api/v1/password/forgot`,
      email,
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `http://localhost:5000/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const data = await fetcher(
      `http://localhost:5000/api/v1/admin/users`,
      "GET"
    );
    dispatch({ type: ALL_USERS_SUCCESS, payload: data });
    // console.log(data.users);
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/admin/user/${id}`
    );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Verify User With Phone Number
export const verifyUser = () => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `http://localhost:5000/api/v1/me/verify`,
      config
    );

    dispatch({ type: VERIFY_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VERIFY_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// ADD A PRODUCT TO USER FAVORITE
export const addToFavorite = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADD_FAVORITE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `http://localhost:5000/api/v1/me/favorites/${id}`
    );
    dispatch({ type: ADD_FAVORITE_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_FAVORITE_FAIL, payload: error.response.data.message });
  }
};

// Get User Favorite Products
export const getFavorites = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FAVORITE_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/v1/me/favorites`
    );

    dispatch({ type: GET_FAVORITE_SUCCESS, payload: data.favorites });
  } catch (error) {
    dispatch({ type: GET_FAVORITE_FAIL, payload: error });
  }
};

//remove a favorite product from user
export const deleteFavorite = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FAVORITE_REQUEST });

    const { data } = await axios.delete(
      `http://localhost:5000/api/v1/me/favorites/${id}`
    );
    dispatch({ type: DELETE_FAVORITE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_FAVORITE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Send Notificaiton to buyers
export const sendNotification = (info, id) => async (dispatch) => {
  try {
    dispatch({ type: SEND_NOTIFICATION_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `http://localhost:5000/api/v1/notification/${id}`,
      info,
      config
    );
    dispatch({ type: SEND_NOTIFICATION_SUCCESS, payload: data.notification });
  } catch (error) {
    dispatch({
      type: SEND_NOTIFICATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Priviledge
export const updatePriviledge = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRIVILEDGE_REQUEST });

    // Update Priviledge of a User = Recycler / Organization

    const data = await fetcher(
      `http://localhost:5000/api/v1/admin/update/privilege-request`,
      "PUT",
      formdata
    );
    console.log(data);
    dispatch({ type: UPDATE_PRIVILEDGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PRIVILEDGE_FAIL, payload: error });
  }
};

// Get Approval Requests
export const getApprovalRequests = () => async (dispatch) => {
  try {
    dispatch({ type: GET_REQUEST_REQUEST });

    const data = await fetcher(
      `http://localhost:5000/api/v1/admin/get-all/privilege-request`,
      "GET"
    );

    dispatch({ type: GET_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_REQUEST_FAIL, payload: error });
  }
};
