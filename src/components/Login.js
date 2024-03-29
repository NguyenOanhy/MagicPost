import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import path from '../utils/path';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate(path.PRIVATE + "/" + path.ORDERS);
      })
      .catch((error) => {
        window.alert("Email or password wrong");
      });
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-xl rounded-lg px-8 py-6 space-y-6 max-w-md w-full">
        <h3 className="text-3xl font-bold text-center text-main-100">Đăng nhập</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-base font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md shadow-sm py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main-100 focus:border-main-100"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-700">Mật khẩu</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md shadow-sm py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main-100 focus:border-main-100"
              placeholder="Enter password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-main-100 hover:bg-main-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-100"
            onClick={handleSubmit}
          >
            Đăng nhập
          </button>
          <div className="flex mt-2 md:mt-0 space-x-2 justify-between">
            <p className="text-main-100 cursor-pointer" onClick={() => navigate(path.FORGOTPW)}>
              Quên mật khẩu
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
