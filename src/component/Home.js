import React, { useEffect, useState } from "react";
import "../css/Home.css";
import Product from "./Product";
import axios from "axios";
import Loader from './common/Loader';

function Home(props) {
  const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
    const ac = new AbortController();
    const fetchProducts = async () => {
      setLoading(true);
      await axios
        .get("https://fakestoreapi.com/products")
        .then((res) => {
          setProducts(res.data);
          // setLoading(false);
        })
        .catch((error) => {
          // console.log(error);
          // setLoading(false);
        });
      setLoading(false);
    }
    fetchProducts();
    return () => ac.abort();
	}, [setLoading]);

  return (
    <>
      <div className="Home">
        <img
          src="./images/background-photo.jpg"
          alt="pic"
          className="Home_img"
        />
        {loading ? <Loader /> :
          <div className="Home_row">
          {
            props.itemCategory === 'all' ?
            products.map((product, id) => {
              return (
                <Product product={product} key={id}/>
              );
            })
            : products
              .filter((item) => item.category === props.itemCategory)
              .map((product, id) => {
                return (
                  <Product product={product} key={id}/>
                )
              })
          }
        </div>}

      </div>
    </>
  );
}

export default Home;
