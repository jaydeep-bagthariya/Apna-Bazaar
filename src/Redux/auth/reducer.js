const initialState = {
  token: null,
  userID: null,
  success: false,
  error: null,
  username: null,
  usermail: null,
  user: null,
};

const authAction = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      let rowname = action.payload.email.split("@");
      console.log("AUTH_SUCCESS", rowname);
      return {
        token: action.payload.accessToken,
        userID: action.payload.uid,
        usermail: action.payload.email,
        username: rowname[0],
        user: action.payload,
        success: true,
        error: null,
      }
    case "AUTH_FAIL":
      console.log("AUTH_FAIL");
      return {
        ...state,
				token: null,
				// loading: false,
        userID: false,
				success: false,
        username: null,
        usermail: null,
        user: null,
				error: action.payload,
      }
    case "SIGN_OUT":
      console.log("SIGN_OUT");
      return {
        ...state,
        userID: null,
        token: null,
        username: null,
        usermail: null,
        user: null,
      }
      case "SET_USER":
        console.log("SET_USER");
        return {
          ...state,
          username: action.username,
          usermail: action.usermail,
          userID: action.userID,
        };  
    default:
      return state;
  }
}

export default authAction;