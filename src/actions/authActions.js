import axios from "../utils/Instance";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,  
  USER_LOADING
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios    
    .post("/signup", userData)    
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {    
    axios({
      method: 'post',      
      url: "/signin",      
      data: userData
    })    
    .then(res => {      
      const token =  res.data.Response.AuthToken;                   
      localStorage.setItem("jwtToken", token);      
      setAuthToken(token);      
      const decoded = jwt_decode(token);      
      dispatch(setCurrentUser(decoded));      
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
      console.log(err);
    });
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));  
};