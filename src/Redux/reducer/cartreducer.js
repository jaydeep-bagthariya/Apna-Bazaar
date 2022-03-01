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

    //case for remove specific item in state cart-array
    case "REMOVE_SINGLE_ITEM":
      for (let i = 0; i <= state.cart.length; i++) {
        if (state.cart[i].id === action.id) {
          state.cart[i].count--;
          break;
        }
      }
      return {
        ...state,
        cart:state.cart,
      };

      case "ADD_SINGLE_ITEM":
        console.log('action',action.id);
        for (let i = 0; i < state.cart.length; i++) {
          if (state.cart[i].id === action.id) {
            state.cart[i].count++;
            break;
          }
        }
        return{
          ...state,
          cart:state.cart
        }

      case "FETCH_USERCART":
        console.log("fetch", action.payload);
        return {
          ...state,
          cart: action.payload,
        }

    default:
      return state;
  }
};

export default cartAction;
