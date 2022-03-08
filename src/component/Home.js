import React, { useEffect, useState } from "react";
import "../css/Home.css";
import Product from "./Product";
import axios from "axios";
import Loader from './common/Loader';
import { Container } from "@material-ui/core";

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
          <Container>
            <div className="Home_row">
          {
            props.itemCategory === 'all' ?
            products
            .filter((item) => item.title.toLowerCase().includes(props.enteredText.toLowerCase()))
            .map((product, id) => {
              return (
                <Product product={product} key={id}/>
              );
            })
            : products
              .filter((item) => item.category === props.itemCategory)
              .filter((item) => item.title.toLowerCase().includes(props.enteredText.toLowerCase()))
              .map((product, id) => {
                return (
                  <Product product={product} key={id}/>
                )
              })
          }
            </div>
          </Container>
        }

      </div>
    </>
  );
}

export default Home;
