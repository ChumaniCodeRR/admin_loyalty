const initialState = {
  user: null,
  errors: [],
  message: null,
  status: false
};

export default function auth (state = initialState, action) {
  switch (action.type) {
    case "SET_LOGGED_IN_USER" :
      return {
        ...state,
        user: action.payload.data,
        errors: action.payload.errors ? action.payload.errors : [],
        message: action.payload.message ? action.payload.message : null
      };

    case "RESET_PASSWORD" :
      return {
        ...state,
        status: action.payload.success,
        errors: action.payload.errors ? action.payload.errors : [],
        message: action.payload.message ? action.payload.message: null
      };
      
    default:
      return state;
  }
}
