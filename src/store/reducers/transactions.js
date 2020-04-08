const initialState = {
  transactions: [],
  status: false,
  errors: []
};

export default function transactions (state = initialState, action) {
  switch(action.type) {
    case "SET_TRANSACTIONS":
      return {
        transactions: action.payload.data,
        status: action.payload.success,
        errors: action.payload.errors ? action.payload.errors: []
      };
    default:
      return state;
  }
}