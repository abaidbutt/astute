const initState = {
  registerSuccess: "",
  registerError: "",
  loading: false,
  token: null,
  user: {},
  authenticate: false,
};

const Auth = (state = initState, action) => {
  switch (action.type) {
    case "Loading":
      state = {
        ...state,
        loading: true,
      };
      break;
    case "success":
      state = {
        ...state,
        registerSuccess: action.payload.success,
        loading: false,
      };
      break;
    case "Error":
      state = {
        ...state,
        registerError: action.payload.error,
        loading: false,
      };
      break;
    case "AUTH":
      state = {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        authenticate: true,
      };
      break;
    case "logout":
      state = {
        ...state,
        authenticate: false,
      };
      break;
    case "ClearingErrors":
      state = {
        ...state,
        registerSuccess: "",
        registerError: "",
      };
      break;
  }
  return state;
};
export default Auth;
