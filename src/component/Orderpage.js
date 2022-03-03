import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Order from "../component/Order";
import "../css/Orderpage.css";

import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";

import { doc, getDocs, collection } from "firebase/firestore";
import db from "../firebase";

function Orderpage() {
  //state for fetch user's order from cloud db
  const [orderDetail, setOrderDetail] = useState([]);
  const [isFetched, newFetched] = useState(false);

  const user = useSelector((state) => state.authAction);
  // const user = cartdata.user;

  useEffect(() => {
    async function fetchOrderDetail() {
      if (user.userID) {
        const userRef = collection(db, "user");
        const idRef = doc(userRef, `${user.userID}`);
        const orders = collection(idRef, "orders");
        const querySnapshot = await getDocs(orders);

        await querySnapshot.docs.forEach(async (val) => {
          console.log("val", val.data())
          const valdata = val.data();
          setOrderDetail((preval) => {
            return [
              ...preval,
              {
                userid: val.id,
                userdata: valdata,
              },
            ];
          });
        });
        newFetched(true);
      } else {
        console.log("cant fetch data");
      }
    }
    fetchOrderDetail();
  }, []);

  console.log(orderDetail);
  return (
    <>
      <div className="order_div">
        <h1>Your Orders</h1>

        {isFetched ? (
          orderDetail.length !== 0 
          ? 
          (
            orderDetail.reverse().map((val, i) => {
              return <Order val={val} key={i} />;
            })
          )
           : 
          (
            <div className="Order_process_div">
              <h2 style={{color:'red'}}>No Order Yet ! 😲</h2>
            </div>
          )
        ) 
          :
         (
          <div className="Order_process_div">
            <CircularProgress />
          </div>
        )
        }
        
      </div>
    </>
  );
}

export default Orderpage;
