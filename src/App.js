import React, { useEffect, useState } from 'react';
import { Login, Signup, Forgotpassword } from "./components";
import { Public } from "./containers/public";
import { Private, PriceShipping, Management, Reports, Order, Profile } from "./containers/private";
import { Routes, Route, useLocation  } from "react-router-dom";
import path from "./utils/path";
import { getCurrentUserEmail, getUserByEmail } from "./firebase";

export default function App() {
  const [user, setUser] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const email = await getCurrentUserEmail();
      const user = await getUserByEmail(email, "user");
      if (user) {
        setUser(user);
      }
    };

    fetchUserData();
  }, [location]);

  return (
    <>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FORGOTPW} element={<Forgotpassword />} />
        <Route path={path.PRIVATE} element={<Private user={user} />}>
          <Route path={path.ORDERS} element={<Order />} />
          <Route path={path.SIGNUP} element={<Signup />} />
          <Route path={path.PRICESHIPPING} element={<PriceShipping />} />
          <Route path={path.MANAGEMENT} element={<Management />} />
          <Route path={path.REPORTS} element={<Reports />} />
          <Route path={path.PROFILE} element={<Profile user={user} />} />
        </Route>
      </Routes>
    </>
  );
}