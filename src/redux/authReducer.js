import { authAPI } from "../api/api";

const SET_USER_DATA = "authReducer/SET_USER_DATA";

let initialState = {
  id: null,
  login: null,
  email: null,
  //isAuth: true
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const setAuthUserData = (id, login, email, isAuth) => ({
  type: SET_USER_DATA,
  payload: { id, login, email, isAuth },
});

export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.me();
  if (response.data.resultCode === 0) {
    let { id, login, email } = response.data.data;
    dispatch(setAuthUserData(id, login, email, true));
  }
};

export const login =
  (email, password, rememberMe, setStatus, setFieldValue, setSubmitting) =>
 async (dispatch) => {
   let response = await authAPI.login(email, password, rememberMe)
      let resultCode = response.data.resultCode;
      if (resultCode === 0) {
        dispatch(getAuthUserData());
      } else {
        let textError = `resultCode: ${resultCode} - ${response.data.messages.join()}`;
        setStatus(textError);
        setFieldValue("general", textError);
        setSubmitting(false);
      };
  };

export const logout = () => async (dispatch) => {
 let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
};

export default authReducer;
