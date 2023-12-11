import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import path from '../utils/path'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, addUserToFirestore } from '../firebase';

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [positon, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
  
    function handleSubmit(event) {
      event.preventDefault();
  
      // Check if passwords match
      if (password !== passwordConfirm) {
        window.alert('Passwords do not match.');
        return;
      }

      addUserToFirestore(name, phone, positon, email, "user");
  
      // Create the user with email and password
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate(path.LOGIN);
        })
        .catch((error) => {
          window.alert('An error occurred during sign up: ' + error.message);
        });
      
      
    }
  

  return (
   /* JSX */
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form className="bg-white shadow-xl rounded-lg px-8 py-6 space-y-6 max-w-md w-full" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="text-center font-bold text-3xl mb-6">Thêm tài khoản nhân viên</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Họ và tên
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter employee's name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Số điện thoại
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter employee's phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
              Chức vụ
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter employee's position"
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-confirm">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-main-100 hover:bg-main-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup;