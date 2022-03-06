import React from "react";
import { useSelector } from "react-redux";
import "../css/Detail.css";
import { useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { addSingleItem, addToCart } from "../Redux/action/action";
import { doc, setDoc, getDoc } from "firebase/firestore";
import db from "../firebase";
import { toast } from "react-toastify";

function Detail() {
  const location = useLocation();
  const dispatch = useDispatch();
  const product = location.state.product;

  const { userID } = useSelector(state => state.authAction);

  console.log(product);
  
  const addToCartHandler = async () => {
    if(userID !== null) {
      const id = product.id.toString().concat(userID);

      let count = 0;
      const docRef = doc(db, "cart", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().count, product.id);
        count = docSnap.data().count;
        const cartRef = doc(db, 'cart', id);
        setDoc(cartRef, { count: count+1 }, { merge: true });
        dispatch(addSingleItem(product.id))
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        const newProduct = {...product, userID, count: 1}
        await setDoc(doc(db, "cart", id), newProduct)
        .then(() => {
          toast.success("New cart product added successfully")
          dispatch(addToCart(newProduct))});
      }
    }
    else {
      toast.error("Please sign in first to add product into the cart")
    }
  }
  
  return (
    <>
      <div className="detail_cart">
        <div className="detail_product">
          <img src={product.image} alt="product-image" className="product_page_image"/>
        </div>
        <div className="detail_product2">
          <Typography variant="h5" className="">
            {product.title}
          </Typography>
          <br />
          <hr />
          <br />
          <Typography variant="body1" color="textSecondary" component="p">
            {product.description}
          </Typography>
          <Typography component="div" className="detail_rating">
            <div className="detail_rating_div">
              {Array(Math.round(product?.rating?.rate)).fill().map((_,i)=>{
                return <p key={i} style={{color:'yellow'}}>🌟 &nbsp;</p>
              })}
            </div>
            <div className="detail_rating_text">
              <p>{`${product.rating.count} rating`}</p>
            </div>
          </Typography>
          <Typography variant="body1" component="div" className="detail_mrp">
            <Typography className="detail_rating_div" variant="body1" color="textSecondary">M.R.P.: </Typography>
            <Typography className="detail_del_price" color="textSecondary"><del>{`$${product.price-5}`}</del></Typography>
          </Typography>
          <Typography variant="body1" component="div" className="detail_price_div">
            <Typography className="detail_rating_div" variant="body1" color="textSecondary">Price: </Typography>
            <div className="detail_price">{`$${product.price}`}</div>
          </Typography>
          <Typography variant="body1" component="div" className="detail_category">
            <Typography className="detail_rating_div" variant="body1" color="textSecondary">Category: </Typography>
            <div className="detail_price">{`${product.category}`}</div>
          </Typography>
          <br />
          <hr />
          <br />
          <Typography className="button_div" onClick={addToCartHandler}>
              <button>Add to Cart</button>
          </Typography>
        </div>
      </div>
    </>
  );
}

export default Detail;
