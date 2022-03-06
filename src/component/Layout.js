import React, { useState } from 'react';
import Header from "./Header";
import Home from "./Home";
// import Payment from "./component/Payment";
import Orderpage from "./Orderpage";
import DetailPage from './DetailPage';
import Checkout from "./Checkout";
import Footer from "./Footer";

import { Switch, Route } from "react-router-dom";

const Layout = () => {
  const [itemCategory, setItemCategory] = useState("all");
  const onItemCategoryChange = (selectedItemCategory) => {
    setItemCategory(selectedItemCategory)
  }
  return (
    <>
      <Header onItemCategoryChange={onItemCategoryChange}/>
        <Switch>
          <Route exact path="/">
            <Home itemCategory={itemCategory}/>
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/detail/:id">
            <DetailPage />
          </Route>
          <Route exact path="/order">
            <Orderpage />
          </Route>
        </Switch>
      <Footer />
    </>
  )
}

export default Layout