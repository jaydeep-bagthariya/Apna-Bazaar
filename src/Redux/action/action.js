
//function for add product in data-layer
export const addToCart = (data) => {
  return {
    type: "ADD_TO_CART",
    payload: data,
  };
};


//function for remove  product in data-layer
export const removeFromCart = (id) => {
  return {
    type: "REMOVE_FROM_CART",
    id: id,
  };
};


//function for set username and user-email data-layer
export const setUsername = (username, mail, user) => {
  return {
    type: "SET_USER",
    username: username,
    usermail: mail,
    user,
  };
};


//function for remove all product in data-layer
export const emptyCart = () => {
  return {
    type: "EMPTY_CART",
  };
};


//funvtion for remove single item in data-layer
export const removeSingleItem = (id) => {
  return {
    type: "REMOVE_SINGLE_ITEM",
    id,
  };
};

export  const addSingleItem=(data)=>{
  return{
    type:'ADD_SINGLE_ITEM',
    data
  }
}