const initialState = {
  vouchers: [],
  voucher: null,
  status: false,
  message: '',
  errors: []
};

export default function voucher(state = initialState, action) {
  switch(action.type) {
    case "SET_VOUCHERS":
      return {
        ...state,
        vouchers: action.payload.data ?? []
      };
    case "SET_VOUCHER":
      return {
        ...state,
        voucher: action.payload.data ?? null
      };
    case "STORE_VOUCHER":
      return {
        ...state,
        status: action.payload.success ?? false,
        errors: action.payload.errors ?? [],
        message: action.payload.message ?? ''
      };
    case "UPDATE_VOUCHER":
      return {
        ...state,
        status: action.payload.success ?? false,
        errors: action.payload.errors ?? [],
        message: action.payload.message ?? ''
      };
    case "DELETE_VOUCHER":
      return {
        ...state,
        status: action.payload.success ?? false,
        errors: action.payload.errors ?? [],
        message: action.payload.message ?? ''
      };
    case "EXPORT_VOUCHER":
      return {
        ...state,
        status: action.payload.success ?? false,
        message: action.payload.message ?? ''
      };
    default:
      return state;
  }
}