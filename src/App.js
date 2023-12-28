import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import path from './utils/path';
import { getCurrentUserEmail, getUserByEmail } from './firebase';
import OrderDetail from './components/order/OrderDetail';
import { Login, Signup, Forgotpassword } from './components';
import { Public } from './containers/public';
import { Private, PriceShipping, Management, Reports, Order, Profile } from './containers/private';

export default function App() {
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage on initial load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : '';
  });

  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const email = await getCurrentUserEmail();
      const fetchedUser = await getUserByEmail(email, 'user');

      if (fetchedUser) {
        setUser(fetchedUser);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(fetchedUser));
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
          <Route path={path.ORDERS} element={<Order user={user} />} />
          <Route path={`${path.ORDERS}/:orderId`} element={<OrderDetail />} />
          <Route path={path.SIGNUP} element={<Signup />} />
          <Route path={path.PRICESHIPPING} element={<PriceShipping />} />
          <Route path={path.MANAGEMENT} element={<Management user={user} />} />
          <Route path={path.REPORTS} element={<Reports user={user} />} />
          <Route path={path.PROFILE} element={<Profile user={user} />} />
        </Route>
        <Route path={`${path.ORDERS}/:orderId`} element={<OrderDetail />} />
      </Routes>
    </>
  );
}
