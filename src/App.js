import React from "react";
import { Login, Signup, Forgotpassword } from "./components";
import { Public } from "./containers/public";
import { Private, PriceShipping, Management, Reports, Order } from "./containers/private";
import { Routes, Route } from "react-router-dom";
import path from "./utils/path";
import OrderCreate from "./components/order/OrderCreate";
import PendingOrder from "./components/order/PendingOrder";


export default function App() {
  return (
    <>
    <Routes>
        <Route path={path.PUBLIC} element={<Public/>} />
        <Route path={path.LOGIN} element={<Login/>} /> 
        <Route path={path.FORGOTPW} element={<Forgotpassword/>} />
        <Route path={path.SIGNUP} element={<Signup/>} />
        <Route path={path.PRIVATE} element={<Private />}> 
          <Route path={path.ORDERS} element={<Order/>} /> 
          <Route path={path.ORDERCREATE} element={<OrderCreate/>} /> 
          <Route path={path.PENDING} element={<PendingOrder/>} />
          <Route path={path.PRICESHIPPING} element={<PriceShipping/>} />
          <Route path={path.MANAGEMENT} element={<Management/>} />
          <Route path={path.REPORTS} element={<Reports/>} />
        </Route>
    </Routes>
    </>
  );
}