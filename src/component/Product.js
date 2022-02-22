import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../css/Product.css";

import { addToCart } from "../Redux/action/action";
import { useDispatch } from "react-redux";

function Product({id, imageLink, pname, detail, price, rating }) {
  const dispatch = useDispatch();
  return (
    <Card className="product">
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {pname}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {detail}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="span">
          <h3><span style={{ marginRight: "2px" }}>₹</span>{price}</h3>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
        <div className="rating_div">
    {Array(rating).fill().map((_,i)=>{
      return <p key={i} style={{color:'yellow'}}>🌟 &nbsp;</p>
    })}
        </div>
        </Typography>
      </CardContent>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="250"
          className="Product_img"
          image={imageLink}
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(addToCart({id, imageLink, pname, detail, price, rating }));
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;
