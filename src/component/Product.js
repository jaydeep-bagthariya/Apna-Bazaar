import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../css/Product.css";

import { addSingleItem, addToCart } from "../Redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase";
import { toast } from 'react-toastify';


function Product({ product }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userID } = useSelector(state => state.authAction);

  const detailBtnHandler = () => {
    history.push({
      pathname: `/detail/${product.id}`,
      state: { product }
    })
  }

  const postItemToCart = async (product, userID) => {
    if(userID !== null) {
      const id = product.id.toString().concat(userID);

      let count = 0;
      const docRef = doc(db, "cart", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().count, product.id);
        count = docSnap.data().count;
        const cartRef = doc(db, 'cart', id);
        setDoc(cartRef, { count: count+1 }, { merge: true });
        dispatch(addSingleItem(product.id))
      } else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");
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
    <Card className="product">
      <div style={{display: "flex", alignItems: "center", justifyContent: 'center', marginTop: '1rem', cursor: 'pointer'}}>
        <img src={product.image} alt="product-image" className="product-img"/>
      </div>
      <CardContent style={{flexGrow: '1'}}>
        <Typography gutterBottom variant="h5" component="h2" className="title_div">
          <abbr title={product.title}>{product.title.length < 22 ? product.title : `${product.title.slice(0, 22)}...`}</abbr>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="span">
          <h3><span style={{ marginRight: "2px" }}>$</span>{product.price}</h3>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
        <div className="rating_div">
          {Array(Math.round(product?.rating?.rate)).fill().map((_,i)=>{
            return <p key={i} style={{color:'yellow'}}>🌟 &nbsp;</p>
          })}
        </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            postItemToCart(product, userID)
            // dispatch(addToCart(product));
          }}
        >
          Add to Cart
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={detailBtnHandler}
        >
          Click To See More
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;
