import { LOGIN_USER, LOGOUT_USER } from '../action/action';
export const initState = {
  email: '',
  role: '',
  username: '',
  isAuth: false,
};
export const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        email: '',
        role: '',
        username: '',
        isAuth: false,
      };
    default:
      return state;
  }
};
