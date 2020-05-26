const initialState = {
  permissions: [],
  status: false,
  message: ''
};

export default function permissions(state = initialState, action) {
  switch(action.type) {
    case "SET_PERMISSIONS":
      return {
        status: action.payload.success ?? false,
        message: action.payload.message ?? '',
        permissions: action.payload.data ?? []
      };
    default :
      return state;
  };
};
