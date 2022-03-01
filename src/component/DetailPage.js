import React from "react";
import { useSelector } from "react-redux";
import "../css/Detail.css";
import CartProduct from "./CartProduct";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { addToCart } from "../Redux/action/action";

function Detail() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const product = location.state.product;
  
  const addToCartHandler = () => {
    dispatch(addToCart(product));
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
      {/* <div>
        <div className="product_description">
					<img src={product.image} className="product_page_image" alt="" />
					<div className="description-wrapper">
						<p>{product.description}</p>
					</div>
				</div>
      </div> */}
    </>
  );
}

export default Detail;
