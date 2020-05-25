const initialState = {
  account: null,
  status: false,
  errors: [],
  message: ''
};

export default function account (state = initialState, action) {
  switch (action.type) {
    case "SET_ACCOUNT" :
      return {
        ...state,
        account: action.payload.data,
        status: action.payload.success
      };

    case "UPDATE_ACCOUNT" :
      return {
        status: action.payload.success,
        errors: action.payload.errors ? action.payload.errors: [],
        message: action.payload.message ?? ''
      }
    default:
      return state;
  }
}
