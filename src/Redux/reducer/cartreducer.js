const initialState = {
  cart: [],
};

const cartAction = (state = initialState, action) => {
  switch (action.type) {

    //case for store product detail in state cart-array
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

      
    //case for delete product detail from state cart-array
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((val) => val.id !== action.id),
      };


    //case for delete all product detail in state cart-array
    case "EMPTY_CART": {
      return {
        ...state,
        cart: [],
      };
    }


    //case for set username and useremail in state
    case "SET_USER":
      return {
        ...state,
        username: action.username,
        usermail: action.usermail,
        user: action.user,
      };


    //case for remove specific item in state cart-array
    case "REMOVE_SINGLE_ITEM":
      for (let i = 0; i <= state.cart.length; i++) {
        if (state.cart[i].id === action.id) {
          state.cart.splice(i, 1);
          break;
        }
      }
      return {
        ...state,
        cart:state.cart,
      };

      case "ADD_SINGLE_ITEM":
        console.log('action',action.data.id);
        for (let i = 0; i <= state.cart.length; i++) {
          if (state.cart[i].id === action.data.id) {
            state.cart.splice(i,0,action.data);
            break;
          }
        }
        return{
          ...state,
          cart:state.cart
        }



    default:
      return state;
  }
};

export default cartAction;
