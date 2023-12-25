import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import path from '../utils/path'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, addUserToFirestore } from '../firebase';

function Signup({ onComplete }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [positon, setPosition] = useState('');
    const [office, setOffice] = useState('');
    const [birth, setBirth] = useState('');
    const [authority, setAuthority] = useState('');
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
  
      // Create the user with email and password
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          onComplete();
          addUserToFirestore(name, phone, positon, birth, email, authority, office, "user");
        })
        .catch((error) => {
          window.alert('An error occurred during sign up: ' + error.message);
        });
    }
  

  return (
   /* JSX */
    <div className="w-2/3 mx-auto rounded-lg shadow-lg items-center justify-center bg-white">
      <form className="bg-white pt-10 px-8 py-6 space-y-6" onSubmit={handleSubmit}>
        <div className="Auth-form-content grid grid-cols-2 gap-3 gap-x-7">
          {/* <h3 className="text-center font-bolspace-y-6d text-3xl mb-6">Thêm tài khoản nhân viên</h3> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Họ và tên
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nhập tên nhân viên"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birth">
              Ngày sinh
            </label>
            <input
              type="date"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder=""
              onChange={(e) => setBirth(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Số điện thoại
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nhập số điện thoại nhân viên"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
              Chức vụ
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="">Chọn chức vụ</option>
              <option value="Lãnh đạo công ty">Lãnh đạo công ty</option>
              <option value="Trưởng điểm tập kết">Trưởng điểm tập kết</option>
              <option value="Trưởng điểm giao dịch">Trưởng điểm giao dịch</option>
              <option value="Nhân viên tại điểm tập kết">Nhân viên tại điểm tập kết</option>
              <option value="Nhân viên tại điểm giao dịch">Nhân viên tại điểm giao dịch</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authority">
              Quyền hạn
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nhập quyền hạn nhân viên"
              onChange={(e) => setAuthority(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="office">
              Bưu cục
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nhập tên bưu cục"
              onChange={(e) => setOffice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-confirm">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder=" Nhập lại mật khẩu"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          
        </div>
        <div className="flex mx-auto items-center justify-center">
            <button
              type="submit"
              className="bg-main-100 hover:bg-main-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Thêm tài khoản
            </button>
          </div>
      </form>
    </div>
  )
}

export default Signup;