const intialState = {
  stores: [],
  store: null,
  status: false,
  errors: [],
  message: ''
};


export default function stores (state = intialState, action) {
  switch(action.type) {
    case "SET_STORES":
      return {
        ...state,
        stores: action.payload.data,
        status: action.payload.success
      };
    case "SET_STORE":
      return {
        ...state,
        store: action.payload.data,
        status: action.payload.success
      };
    case "SAVE_STORE":
      return {
        ...state,
        store: action.payload.data,
        status: action.payload.success,
        errors: action.payload.errors ?? [],
        message: action.payload.message ?? ''
      };
    case "UPDATE_STORE":
      return {
        ...state,
        status: action.payload.success,
        errors: action.payload.errors ?? [],
        message: action.payload.message ?? ''
      };
    case "IMPORT_STORE":
      return {
        ...state,
        status: action.payload.success,
        errors: action.payload.errors ?? [],
        message: action.payload.message ?? ''
      };
    case "DESTROY_STORE":
      return {
        ...state,
        status: action.payload.success,
        errors: action.payload.errors ?? [],
        message: action.payload.message ?? ''
      };
    default:
      return state;
  }
}