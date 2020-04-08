const initialState = {
  user: null,
  status: false,
  message: null,
  errors: [],
  users: []
};


export default function user (state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.data ? action.payload.data : null,
        errors: action.payload.errors ? action.payload.errors: [],
        message: action.payload.message ? action.payload.message : null
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload.data ? action.payload.data : null,
        errors: action.payload.errors ? action.payload.errors: [],
        message: action.payload.message ? action.payload.message : null
      };
    case "CREATE_USER":
      return {
        ...state,
        status: action.payload.success,
        errors: action.payload.errors ? action.payload.errors: [],
        message: action.payload.message ? action.payload.message : null
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload.data ? action.payload.data : null,
        errors: action.payload.errors ? action.payload.errors : [],
        status: action.payload.success ? action.payload.success : false,
        message: action.payload.message ? action.payload.message : null
      };
      case "DELETE_USER":
        return {
          ...state,
          status: action.payload.success ? action.payload.success : false,
          message: action.payload.message ? action.payload.message : null
        };
    default:
      return state;
  }
}