import React, { useEffect, useState } from "react";
import "../css/Home.css";
import Product from "./Product";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios
			.get("https://fakestoreapi.com/products")
			.then((res) => {
				setProducts(res.data);
				// setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				// setLoading(false);
			});
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
          {products.map((product, id) => {
            return (
              <Product product={product} key={id}/>
            );
          })}
        </div>
        {/* <div className="Home_row">
          <Product
            id={1}
            imageLink="https://t4.ftcdn.net/jpg/04/00/60/83/240_F_400608394_b3gFxkvI0KbaXHs6yAHCMqQLV7FSYlcz.jpg"
            pname="amazone echo"
            detail="this is amazone product this is build by jd"
            price="500"
            rating={4}
          />
          <Product
            id={2}
            imageLink="https://t3.ftcdn.net/jpg/02/78/69/30/240_F_278693034_8Y0zOaiF7357X3xBRruRUrv5XDz6UoFS.jpg"
            pname="remote"
            detail="this is amazone product this is build by amazone"
            price="250"
            rating={4}
          /> */}
        {/* </div>
        <div className="Home_row"> */}
          {/* <Product
            id={3}
            imageLink="https://t3.ftcdn.net/jpg/01/32/73/36/240_F_132733698_Cl1Mwc3su7ZdfF0B10oiDzofpbTrkoTn.jpg"
            pname="fire-stick tv remote"
            detail="this is amazone product this is build by netflix"
            price="300"
            rating={4}
          />
          <Product
            id={4}
            imageLink="https://t3.ftcdn.net/jpg/01/47/51/18/240_F_147511882_BrCfgr8RIR9y3DK4Y3qejrWirvigicoj.jpg"
            pname="kichen ware"
            detail="this is amazone product this is build by shopbuddy"
            price="600"
            rating={3}
          />
          <Product
            id={5}
            imageLink="https://t4.ftcdn.net/jpg/03/28/37/93/240_F_328379347_xEKgEB2wkjAJmcqSTmrg4uKxfWrlL7D9.jpg"
            pname="Headphone"
            detail="this is amazone product this is build by programmer"
            price="600"
            rating={5}
          />
        </div> */}
      </div>
    </>
  );
}

export default Home;
