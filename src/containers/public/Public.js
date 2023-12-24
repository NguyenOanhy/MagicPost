import React, { useState } from "react";
import { Link } from "react-router-dom";
import icons from "../../utils/icons";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const { CiSearch } = icons;
const Public = () => {
  const [orderId, setOrderId] = useState("");

  const search = (e) => {
    e.preventDefault();
    /* Search order id */
    window.location.href = `/orderPreview/${orderId}`;
    setOrderId("");
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex items-center justify-between px-8 py-2 mb-10">
        <div className="flex flex-row items-center justify-center">
          <img
            class="w-24 px-3 py-0"
            src={require("../../image/shipping_box.png")}
            alt="image description"
          ></img>
          <p className="font-bold text-3xl text-blue-600 align-middle">
            Magic Post
          </p>
        </div>
        <div className="flex flex-row px-3 py-2 space-x-2 mr-15 rounded-md bg-blue-300">
          <Link to="/login" className="btn small">
            <div class="px-2 ">
              <i className="fas fa-sign-in-alt"></i> ĐĂNG NHẬP
            </div>
          </Link>
        </div>
      </div>
      <div className="">
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>Tra cứu đơn hàng</Tab>
            <Tab>Tra cứu cước phí</Tab>
          </TabList>

          <TabPanel>
            <div className="flex flex-row items-center">
              <div className="flex-col w-full mt-36 flex items-start justify-center ml-24">
                {/* Search bar */}
                <p className="font-bold text-xl ml-5 mb-5">
                  Nhập mã vận đơn của bạn
                </p>
                <form onSubmit={search} className="flex items-center space-x-2">
                  <input
                    className="w-850 border border-blue-400 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="VD: Magic123"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
                  >
                    <CiSearch size={20} />
                  </button>
                </form>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-5 grid grid-cols-6 gap-4">
              <div className="col-start-1 col-span-3">
                <form class="max-w-md mx-auto mt-20">
                  <div class="relative z-0 w-full mb-7 group">
                    <select
                      type="number"
                      name="SENDER_PROVINCE"
                      id="province_from"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      defaultValue={"Hà Nội"}
                      required
                    >
                      <option value="1">
                        <span class="option-text">TP.Hà Nội</span>
                      </option>
                      <option value="2" selected>
                        <span class="option-text">TP.Hồ Chí Minh</span>
                      </option>
                      <option value="3">
                        <span class="option-text">TP.Hải Phòng</span>
                      </option>
                      <option value="4">
                        <span class="option-text">TP.Đà Nẵng</span>
                      </option>
                      <option value="5">
                        <span class="option-text">TP.Cần Thơ</span>
                      </option>
                      <option value="6">
                        <span class="option-text">T.Tiền Giang</span>
                      </option>
                      <option value="8">
                        <span class="option-text">T.Hậu Giang</span>
                      </option>
                      <option value="9">
                        <span class="option-text">T.Đăk Nông</span>
                      </option>
                      <option value="10">
                        <span class="option-text">T.Vĩnh Phúc</span>
                      </option>
                      <option value="11">
                        <span class="option-text">T.Bắc Ninh</span>
                      </option>
                      <option value="12">
                        <span class="option-text">T.Hải Dương</span>
                      </option>
                      <option value="13">
                        <span class="option-text">T.Hưng Yên</span>
                      </option>
                      <option value="14">
                        <span class="option-text">T.Hà Nam</span>
                      </option>
                      <option value="15">
                        <span class="option-text">T.Nam Ðịnh</span>
                      </option>
                      <option value="16">
                        <span class="option-text">T.Thái Bình</span>
                      </option>
                      <option value="17">
                        <span class="option-text">T.Ninh Bình</span>
                      </option>
                      <option value="18">
                        <span class="option-text">T.Hà Giang</span>
                      </option>
                      <option value="19">
                        <span class="option-text">T.Cao Bằng</span>
                      </option>
                      <option value="20">
                        <span class="option-text">T.Lào Cai</span>
                      </option>
                      <option value="21">
                        <span class="option-text">T.Bắc Kạn</span>
                      </option>
                      <option value="22">
                        <span class="option-text">T.Lạng Sơn</span>
                      </option>
                      <option value="23">
                        <span class="option-text">T.Tuyên Quang</span>
                      </option>
                      <option value="24">
                        <span class="option-text">T.Yên Bái</span>
                      </option>
                      <option value="25">
                        <span class="option-text">T.Thái Nguyên</span>
                      </option>
                      <option value="26">
                        <span class="option-text">T.Phú Thọ</span>
                      </option>
                      <option value="27">
                        <span class="option-text">T.Bắc Giang</span>
                      </option>
                      <option value="28">
                        <span class="option-text">T.Quảng Ninh</span>
                      </option>
                      <option value="29">
                        <span class="option-text">T.Lai Châu</span>
                      </option>
                      <option value="30">
                        <span class="option-text">T.Sơn La</span>
                      </option>
                      <option value="31">
                        <span class="option-text">T.Hòa Bình</span>
                      </option>
                      <option value="32">
                        <span class="option-text">T.Thanh Hóa</span>
                      </option>
                      <option value="33">
                        <span class="option-text">T.Nghệ An</span>
                      </option>
                      <option value="34">
                        <span class="option-text">T.Hà Tĩnh</span>
                      </option>
                      <option value="35">
                        <span class="option-text">T.Quảng Bình</span>
                      </option>
                      <option value="36">
                        <span class="option-text">T.Quảng Trị</span>
                      </option>
                      <option value="37">
                        <span class="option-text">T.Thừa Thiên - Huế</span>
                      </option>
                      <option value="38">
                        <span class="option-text">T.Quảng Nam</span>
                      </option>
                      <option value="39">
                        <span class="option-text">T.Quảng Ngãi</span>
                      </option>
                      <option value="40">
                        <span class="option-text">T.Bình Ðịnh</span>
                      </option>
                      <option value="41">
                        <span class="option-text">T.Phú Yên</span>
                      </option>
                      <option value="42">
                        <span class="option-text">T.Khánh Hòa</span>
                      </option>
                      <option value="43">
                        <span class="option-text">T.Kon Tum</span>
                      </option>
                      <option value="44">
                        <span class="option-text">T.Gia Lai</span>
                      </option>
                      <option value="45">
                        <span class="option-text">T.Đăk Lăk</span>
                      </option>
                      <option value="46">
                        <span class="option-text">T.Lâm Ðồng</span>
                      </option>
                      <option value="47">
                        <span class="option-text">T.Ninh Thuận</span>
                      </option>
                      <option value="48">
                        <span class="option-text">T.Bình Phước</span>
                      </option>
                      <option value="49">
                        <span class="option-text">T.Tây Ninh</span>
                      </option>
                      <option value="50">
                        <span class="option-text">T.Bình Dương</span>
                      </option>
                      <option value="51">
                        <span class="option-text">T.Đồng Nai</span>
                      </option>
                      <option value="52">
                        <span class="option-text">T.Bình Thuận</span>
                      </option>
                      <option value="53">
                        <span class="option-text">T.Bà Rịa - Vũng Tàu</span>
                      </option>
                      <option value="54">
                        <span class="option-text">T.Long An</span>
                      </option>
                      <option value="55">
                        <span class="option-text">T.Đồng Tháp</span>
                      </option>
                      <option value="56">
                        <span class="option-text">T.An Giang</span>
                      </option>
                      <option value="57">
                        <span class="option-text">T.Vĩnh Long</span>
                      </option>
                      <option value="58">
                        <span class="option-text">T.Bến Tre</span>
                      </option>
                      <option value="59">
                        <span class="option-text">T.Kiên Giang</span>
                      </option>
                      <option value="60">
                        <span class="option-text">T.Trà Vinh</span>
                      </option>
                      <option value="61">
                        <span class="option-text">T.Sóc Trăng</span>
                      </option>
                      <option value="62">
                        <span class="option-text">T.Bạc Liêu</span>
                      </option>
                      <option value="63">
                        <span class="option-text">T.Cà Mau</span>
                      </option>
                      <option value="64">
                        <span class="option-text">T.Điện Biên</span>
                      </option>
                    </select>
                    <label
                      for="province_from"
                      class="peer-focus:font-medium absolute text-l text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Gửi từ
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-7 group">
                    <select
                      type="number"
                      name="RECEIVER_PROVINCE"
                      id="to_province"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      defaultValue={"Hà Nội"}
                      required
                    >
                      <option value="1">
                        <span class="option-text">TP.Hà Nội</span>
                      </option>
                      <option value="2" selected>
                        <span class="option-text">TP.Hồ Chí Minh</span>
                      </option>
                      <option value="3">
                        <span class="option-text">TP.Hải Phòng</span>
                      </option>
                      <option value="4">
                        <span class="option-text">TP.Đà Nẵng</span>
                      </option>
                      <option value="5">
                        <span class="option-text">TP.Cần Thơ</span>
                      </option>
                      <option value="6">
                        <span class="option-text">T.Tiền Giang</span>
                      </option>
                      <option value="8">
                        <span class="option-text">T.Hậu Giang</span>
                      </option>
                      <option value="9">
                        <span class="option-text">T.Đăk Nông</span>
                      </option>
                      <option value="10">
                        <span class="option-text">T.Vĩnh Phúc</span>
                      </option>
                      <option value="11">
                        <span class="option-text">T.Bắc Ninh</span>
                      </option>
                      <option value="12">
                        <span class="option-text">T.Hải Dương</span>
                      </option>
                      <option value="13">
                        <span class="option-text">T.Hưng Yên</span>
                      </option>
                      <option value="14">
                        <span class="option-text">T.Hà Nam</span>
                      </option>
                      <option value="15">
                        <span class="option-text">T.Nam Ðịnh</span>
                      </option>
                      <option value="16">
                        <span class="option-text">T.Thái Bình</span>
                      </option>
                      <option value="17">
                        <span class="option-text">T.Ninh Bình</span>
                      </option>
                      <option value="18">
                        <span class="option-text">T.Hà Giang</span>
                      </option>
                      <option value="19">
                        <span class="option-text">T.Cao Bằng</span>
                      </option>
                      <option value="20">
                        <span class="option-text">T.Lào Cai</span>
                      </option>
                      <option value="21">
                        <span class="option-text">T.Bắc Kạn</span>
                      </option>
                      <option value="22">
                        <span class="option-text">T.Lạng Sơn</span>
                      </option>
                      <option value="23">
                        <span class="option-text">T.Tuyên Quang</span>
                      </option>
                      <option value="24">
                        <span class="option-text">T.Yên Bái</span>
                      </option>
                      <option value="25">
                        <span class="option-text">T.Thái Nguyên</span>
                      </option>
                      <option value="26">
                        <span class="option-text">T.Phú Thọ</span>
                      </option>
                      <option value="27">
                        <span class="option-text">T.Bắc Giang</span>
                      </option>
                      <option value="28">
                        <span class="option-text">T.Quảng Ninh</span>
                      </option>
                      <option value="29">
                        <span class="option-text">T.Lai Châu</span>
                      </option>
                      <option value="30">
                        <span class="option-text">T.Sơn La</span>
                      </option>
                      <option value="31">
                        <span class="option-text">T.Hòa Bình</span>
                      </option>
                      <option value="32">
                        <span class="option-text">T.Thanh Hóa</span>
                      </option>
                      <option value="33">
                        <span class="option-text">T.Nghệ An</span>
                      </option>
                      <option value="34">
                        <span class="option-text">T.Hà Tĩnh</span>
                      </option>
                      <option value="35">
                        <span class="option-text">T.Quảng Bình</span>
                      </option>
                      <option value="36">
                        <span class="option-text">T.Quảng Trị</span>
                      </option>
                      <option value="37">
                        <span class="option-text">T.Thừa Thiên - Huế</span>
                      </option>
                      <option value="38">
                        <span class="option-text">T.Quảng Nam</span>
                      </option>
                      <option value="39">
                        <span class="option-text">T.Quảng Ngãi</span>
                      </option>
                      <option value="40">
                        <span class="option-text">T.Bình Ðịnh</span>
                      </option>
                      <option value="41">
                        <span class="option-text">T.Phú Yên</span>
                      </option>
                      <option value="42">
                        <span class="option-text">T.Khánh Hòa</span>
                      </option>
                      <option value="43">
                        <span class="option-text">T.Kon Tum</span>
                      </option>
                      <option value="44">
                        <span class="option-text">T.Gia Lai</span>
                      </option>
                      <option value="45">
                        <span class="option-text">T.Đăk Lăk</span>
                      </option>
                      <option value="46">
                        <span class="option-text">T.Lâm Ðồng</span>
                      </option>
                      <option value="47">
                        <span class="option-text">T.Ninh Thuận</span>
                      </option>
                      <option value="48">
                        <span class="option-text">T.Bình Phước</span>
                      </option>
                      <option value="49">
                        <span class="option-text">T.Tây Ninh</span>
                      </option>
                      <option value="50">
                        <span class="option-text">T.Bình Dương</span>
                      </option>
                      <option value="51">
                        <span class="option-text">T.Đồng Nai</span>
                      </option>
                      <option value="52">
                        <span class="option-text">T.Bình Thuận</span>
                      </option>
                      <option value="53">
                        <span class="option-text">T.Bà Rịa - Vũng Tàu</span>
                      </option>
                      <option value="54">
                        <span class="option-text">T.Long An</span>
                      </option>
                      <option value="55">
                        <span class="option-text">T.Đồng Tháp</span>
                      </option>
                      <option value="56">
                        <span class="option-text">T.An Giang</span>
                      </option>
                      <option value="57">
                        <span class="option-text">T.Vĩnh Long</span>
                      </option>
                      <option value="58">
                        <span class="option-text">T.Bến Tre</span>
                      </option>
                      <option value="59">
                        <span class="option-text">T.Kiên Giang</span>
                      </option>
                      <option value="60">
                        <span class="option-text">T.Trà Vinh</span>
                      </option>
                      <option value="61">
                        <span class="option-text">T.Sóc Trăng</span>
                      </option>
                      <option value="62">
                        <span class="option-text">T.Bạc Liêu</span>
                      </option>
                      <option value="63">
                        <span class="option-text">T.Cà Mau</span>
                      </option>
                      <option value="64">
                        <span class="option-text">T.Điện Biên</span>
                      </option>
                    </select>
                    <label
                      for="to_province"
                      class="peer-focus:font-medium absolute text-l text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Gửi đến
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-7 group">
                    <input
                      type="text"
                      name="trongluong"
                      id="trongluong"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="trongluong"
                      class="peer-focus:font-medium absolute text-l text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Khối lượng hàng hóa
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-7 group">
                    <input
                      type="text"
                      name="tienthuho"
                      id="tienthuho"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      for="tienthuho"
                      class="peer-focus:font-medium absolute text-l text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Tiền thu hộ
                    </label>
                  </div>
                  <button
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Tra cứu
                  </button>
                </form>
              </div>
              <div className="col-start-4 col-span-3">
                <img
                  class="w-full px-3 py-5"
                  src={require("../../image/maps.png")}
                  alt="image description"
                ></img>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Public;
