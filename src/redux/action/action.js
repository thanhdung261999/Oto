export const LOGIN_USER = 'login_user';
export const LOGOUT_USER = 'logout_user';
export const loginUser = (payload) => {
  return {
    type: LOGIN_USER,
    payload,
  };
};
export const logoutUser = (payload) => {
  return {
    type: LOGOUT_USER,
    payload,
  };
};
