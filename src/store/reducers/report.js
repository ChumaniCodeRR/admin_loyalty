const initialState = {
  payload: [],
  status: false,
  message: ''
};

export default function report (state = initialState, action) {
  switch(action.type) {
    case "SET_PAYLOAD":
      return {
        status: action.payload.success,
        payload: action.payload.data
      };
    default:
      return state;
  }
}