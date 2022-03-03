import React, { useEffect, useState } from "react";
import "../css/Home.css";
import Product from "./Product";
import axios from "axios";

function Home(props) {
  const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get("https://fakestoreapi.com/products")
        .then((res) => {
          setProducts(res.data);
          // setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // setLoading(false);
        });
    }
    fetchProducts();
	}, []);

  return (
    <>
      <div className="Home">
        <img
          // src="https://store-images.s-microsoft.com/image/apps.16285.14618985536919905.552c0017-6644-49a8-8467-8f7b34ce0428.30ad6b05-16d9-4d5e-a242-43107708a16a?mode=scale&q=90&h=1080&w=1920"
          src="./images/background-photo.jpg"
          alt="pic"
          className="Home_img"
        />
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
        </div>
      </div>
    </>
  );
}

export default Home;
