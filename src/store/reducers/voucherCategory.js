const initialState = {
  status: false,
  categories: [],
  message: '',
  category: null,
  errors: []
}

export default function voucherCategory(state = initialState, action) {
  switch(action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload.data ?? []
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload.data ?? null
      };
    case "STORE_CATEGORY":
      return {
        ...state,
        status: action.payload.success ?? false,
        errors: action.payload.errors ?? [],
        message: action.payload.message ?? ''
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        status: action.payload.success ?? false,
        errors: action.payload.errors ?? [],
        message: action.payload.message ?? ''
      }
    case "DELETE_CATEGORY":
      return {
        status: action.payload.success ?? false,
        message: action.payload.message ?? ''
      };
    default: 
      return state;
  }
}