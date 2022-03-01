import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
// import { doc, deleteDoc } from "firebase/firestore";
import db from "../../firebase";

//function for add product in data-layer
export const addToCart = (data) => {
  return {
    type: "ADD_TO_CART",
    payload: data,
  };
};

export const fetchUserCart = (userID) => dispatch => {
  const cartProduct = [];
  getDocs(collection(db, "cart"))
  .then(res => {
    res.forEach((doc)=> {
      const obj = {
        id: doc.id,
        ...doc.data(),
      }
      cartProduct.push(obj);
    });
    console.log(cartProduct);
    if (cartProduct !== undefined) {
      dispatch({type: "FETCH_USERCART", payload: cartProduct})
    }
  })
  // try {
  //   // setLoading(true);
  //   const products = getDocs(collection(db, "cart"));
  //   console.log(products);
  //   const productsList = [];
  //   products.map((doc) => {
  //     const obj = {
  //       id: doc.id,
  //       ...doc.data(),
  //     }
  //     productsList.push(obj);
  //     console.log(productsList);
  //     // setLoading(false);
  //   });

  //   // setProducts(productsList);
  // } catch (error) {
  //   console.log(error);
  //   // setLoading(false);
  // }   
}


//function for remove  product in data-layer
export const removeFromCart = (id) => {
  return {
    type: "REMOVE_FROM_CART",
    id: id,
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

export  const addSingleItem=(id)=>{
  return{
    type:'ADD_SINGLE_ITEM',
    id
  }
}

