import React from "react";
import { Home, Login, Signup, Forgotpassword, PriceShipping, Management, Reports } from "./components";
import { Public } from "./containers/public";
import { Private } from "./containers/private";
import { Routes, Route } from "react-router-dom";
import path from "./utils/path";
import OrderCreate from "./components/order/OrderCreate";

export default function App() {
  return (
    <>
    <Routes>
        <Route path={path.PUBLIC} element={<Public />}> 
          <Route path={path.HOME} element={<Home/>} />
        </Route>
        <Route path={path.LOGIN} element={<Login/>} /> 
        <Route path={path.FORGOTPW} element={<Forgotpassword/>} />
        <Route path={path.SIGNUP} element={<Signup/>} />
        <Route path={path.ORDERS} element={<OrderCreate/>} /> 
        <Route path={path.PRICESHIPPING} element={<PriceShipping/>} />
        <Route path={path.MANAGEMENT} element={<Management/>} />
        <Route path={path.REPORTS} element={<Reports/>} />

        <Route path={path.PRIVATE} element={<Private />}> 
        </Route>
    </Routes>
    </>
  );
}