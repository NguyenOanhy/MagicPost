import React, { useState } from "react";
import { Link } from "react-router-dom";
import icons from "../../utils/icons";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getDocumentById, getShippingFeeByCustomer } from "../../firebase";
import { Timeline } from "./timeline/timeline";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import { FaArrowRight } from "react-icons/fa6";

const { CiSearch } = icons;
const Public = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [shippingPrice, setShippingPrice] = useState(null);
  const [id, setId] = useState("");
  const [showSlider, setShowslider] = useState(true);

  const search = async (e) => {
    e.preventDefault();
    /* Perform the search for order id and update trackingInfo */
    // Example: You can fetch data from an API here
    // For now, setting a dummy tracking info
    const id = orderId.replace("MP", "");
    const orderData = await getDocumentById(id, "order");
    setTrackingInfo(orderData);
    setShowslider(false);
    //setOrderId("");
  };

  const date = (dateTime) => {
    const stringArray = dateTime.split(" ");
    return stringArray[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get values from form fields
    const senderProvince = document.getElementById("province_from").value;
    const receiverProvince = document.getElementById("to_province").value;
    const productType = document.getElementById("product_type").value;
    const weight = document.getElementById("trongluong").value;

    // You can perform any additional validations here

    // Example: You can fetch shipping fee data from an API
    const shippingFee = await getShippingFeeByCustomer(
      senderProvince,
      receiverProvince,
      weight,
      productType
    );

    // Do something with the shipping fee, for example, display it to the user
    console.log("Shipping Fee:", shippingFee);
    setShippingPrice(shippingFee);

    // Clear form fields or reset form state if needed
    // setSenderProvince('');
    // setReceiverProvince('');
    // setProductType('');
    // setWeight('');
    // setShippingType('');
  };
  const handleOnClick = () => {
    navigate(`/orders/${orderId.replace("MP", "")}`, {
      state: {
        orderId: orderId.replace("MP", ""),
        orderData: trackingInfo,
      },
    });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex items-center justify-between px-8 py-2">
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
        <div className="flex flex-row px-3 py-2 space-x-2 mr-12 rounded-md text-white bg-main-100">
          <Link to="/login" className="btn small">
            <div class="px-2 ">
              <i className="fas fa-sign-in-alt"></i> ĐĂNG NHẬP
            </div>
          </Link>
        </div>
      </div>
      <div className="section-banner relative">
        <img
          src="https://viettelpost.com.vn/wp-content/themes/viettel/images/page-banner.jpg"
          class="w-100"
        ></img>
        <div class="content absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center">
          <div>
            <p className="text-[26px] uppercase font-bold tracking-[.30em] text-white mb-[1em]">
              Magic Post
            </p>
            <p class="text-white tracking-[.25em] text-[20px]">
              Chúng tôi không chỉ gửi hàng, chúng tôi gửi niềm tin
            </p>
          </div>
        </div>
      </div>
      <div className="w-5/6 flex flex-col shadow-lg mt-5 items-center mx-auto">
        <Tabs className={"w-full"} defaultIndex={0}>
          <TabList className={"w-full bg-slate-200 shadow-lg items-center border"}>
            <div className="grid grid-cols-2 text-center font-bold text-md">
              <Tab
                className={"py-4 justify-center rounded-none cursor-pointer"}
              >
                Tra cứu đơn hàng
              </Tab>
              <Tab
                className={"py-4 justify-center rounded-none cursor-pointer"}
              >
                Tra cứu cước phí
              </Tab>
            </div>
          </TabList>

          <TabPanel>
            <div className="mt-5 grid grid-cols-6 gap-4">
              <div className="col-start-1 col-span-3 justify-center">
                <div className="flex-col mt-10 flex items-center justify-start">
                  {/* Search bar */}
                  <p className="font-bold text-gray-600 text-xl mb-5">
                    Nhập mã vận đơn của bạn
                  </p>
                </div>
                <div className="w-full flex flex-col items-center space-x-2">
                  <form
                    onSubmit={search}
                    className="w-full flex flex-col items-center justify-center space-x-2"
                  >
                    <input
                      className="w-2/3 px-5 border border-blue-400 rounded-3xl py-2 focus:outline-none focus:border-blue-500"
                      type="text"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="VD: MP123"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 w-36 mt-5 flex flex-row hover:bg-blue-600 text-white py-2 px-4 rounded-xl"
                    > 
                    <span className="mr-3">TRA CỨU</span>  
                      <FaArrowRight size={20}/>
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-start-4 col-span-3">
                <img
                  class="h-auto w-2/3 mx-auto py-2"
                  src={require("../../image/ship3.png")}
                  alt="image description"
                ></img>
              </div>
              {/* Display tracking info if available */}
              <div className="mt-12 w-full col-start-1 col-span-6 items-center justify-center mx-auto">
                {/* {showSlider && <Slider />} */}
                {trackingInfo && (
                  <div className="w-5/6 mx-auto">
                    <div className="mt-5 bg-[#F0F2F5] rounded-lg p-4 shadow-md mb-5">
                      <h2 className="font-bold text-lg">THÔNG TIN VẬN ĐƠN</h2>
                      <div className="flex flex-row space-x-4 mt-5">
                        <div className="w-1/3 border-t-0 border-r border-b-0 border-l-0 border-black border-solid">
                          <div className="flex mr-3 mb-2">
                            <p className="font-bold">Mã vận đơn:</p>
                            <p className="ml-auto">{orderId}</p>
                          </div>
                          <div
                            className="flex mr-3 mb-2"
                            onClick={handleOnClick}
                            style={{ cursor: "pointer" }}
                          >
                            <p className="font-bold">Chi tiết đơn hàng:</p>
                            <p
                              className="ml-auto"
                              style={{
                                color: "blue",
                                textDecoration: "underline",
                              }}
                            >
                              Xem chi tiết
                            </p>
                          </div>
                          <div className="flex mb-2">
                            <p className="font-bold">Người gửi:</p>
                            <p className="ml-12">
                              {trackingInfo.consignor.name} -{" "}
                              {trackingInfo.consignor.city}
                            </p>
                          </div>
                          <div className="flex mb-2">
                            <p className="font-bold">Người nhận:</p>
                            <p className="ml-12">
                              {trackingInfo.consignee.name} -{" "}
                              {trackingInfo.consignee.city}
                            </p>
                          </div>
                        </div>
                        <div className="w-1/3 border-t-0 border-r border-b-0 border-l-0 border-black border-solid">
                          <div className="flex mr-3 mb-2">
                            <p className="font-bold">Loại hàng hóa:</p>
                            <p className="ml-auto">
                              {trackingInfo.product.type}
                            </p>
                          </div>
                          <div className="flex mr-3 mb-2">
                            <p className="font-bold">Khối lượng (g):</p>
                            <p className="ml-auto">
                              {trackingInfo.product.weight}
                            </p>
                          </div>
                          <div className="flex mr-3 mb-2">
                            <p className="font-bold">Dịch vụ:</p>
                            <p className="ml-auto">
                              {trackingInfo.shipping_detail.type}
                            </p>
                          </div>
                          <div className="flex mr-3 mb-2">
                            <p className="font-bold">Trạng thái:</p>
                            <p className="ml-auto">
                              {trackingInfo.order_status}
                            </p>
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex mr-3 mb-2">
                            <p className="font-bold">Ngày tạo:</p>
                            <p className="ml-auto">
                              {date(trackingInfo.shipping_detail.date)}
                            </p>
                          </div>
                          <div className="flex mr-3 mb-2">
                            <p className="font-bold">Ngày nhận hàng: </p>
                            <p className="ml-auto">
                              {trackingInfo.shipping_detail.shipping_date}
                            </p>
                          </div>
                          <div className="flex mr-3 mb-2">
                            <p className="font-bold">
                              Ngày giao hàng dự kiến:{" "}
                            </p>
                            <p className="ml-auto">
                              {trackingInfo.shipping_detail.estimated_date}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* ... other tracking info properties */}
                    </div>
                    <div className="mt-5 bg-[#F0F2F5] rounded-lg p-4 shadow-md mb-5">
                      <h2 className="font-bold text-lg ">LỊCH SỬ VẬN ĐƠN</h2>
                      <Timeline data={trackingInfo.log} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-5 grid grid-cols-6 gap-4">
              <div className="col-start-1 col-span-3">
                <form class="max-w-md mx-auto mt-20">
                  <div class="relative z-0 w-full mb-7 group">
                    <select
                      type="text"
                      name="SENDER_PROVINCE"
                      id="province_from"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      defaultValue={"Hà Nội"}
                      required
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Hồ Chí Minh" selected>
                        Hồ Chí Minh
                      </option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Tiền Giang">Tiền Giang</option>
                      <option value="Hậu Giang">Hậu Giang</option>
                      <option value="Đắk Nông">Đắk Nông</option>
                      <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                      <option value="Bắc Ninh">Bắc Ninh</option>
                      <option value="Hải Dương">Hải Dương</option>
                      <option value="Hưng Yên">Hưng Yên</option>
                      <option value="Hà Nam">Hà Nam</option>
                      <option value="Nam Định">Nam Định</option>
                      <option value="Thái Bình">Thái Bình</option>
                      <option value="Ninh Bình">Ninh Bình</option>
                      <option value="Hà Giang">Hà Giang</option>
                      <option value="Cao Bằng">Cao Bằng</option>
                      <option value="Lào Cai">Lào Cai</option>
                      <option value="Bắc Kạn">Bắc Kạn</option>
                      <option value="Lạng Sơn">Lạng Sơn</option>
                      <option value="Tuyên Quang">Tuyên Quang</option>
                      <option value="Yên Bái">Yên Bái</option>
                      <option value="Thái Nguyên">Thái Nguyên</option>
                      <option value="Phú Thọ">Phú Thọ</option>
                      <option value="Bắc Giang">Bắc Giang</option>
                      <option value="Quảng Ninh">Quảng Ninh</option>
                      <option value="Lai Châu">Lai Châu</option>
                      <option value="Sơn La">Sơn La</option>
                      <option value="Hòa Bình">Hòa Bình</option>
                      <option value="Thanh Hóa">Thanh Hóa</option>
                      <option value="Nghệ An">Nghệ An</option>
                      <option value="Hà Tĩnh">Hà Tĩnh</option>
                      <option value="Quảng Bình">Quảng Bình</option>
                      <option value="Quảng Trị">Quảng Trị</option>
                      <option value="Thừa Thiên Huế">Thừa Thiên - Huế</option>
                      <option value="Quảng Nam">Quảng Nam</option>
                      <option value="Quảng Ngãi">Quảng Ngãi</option>
                      <option value="Bình Ðịnh">Bình Ðịnh</option>
                      <option value="Phú Yên">Phú Yên</option>
                      <option value="Khánh Hòa">Khánh Hòa</option>
                      <option value="Kon Tum">Kon Tum</option>
                      <option value="Gia Lai">Gia Lai</option>
                      <option value="Đắk Lắk">Đắk Lắk</option>
                      <option value="Lâm Ðồng">Lâm Ðồng</option>
                      <option value="Ninh Thuận">Ninh Thuận</option>
                      <option value="Bình Phước">Bình Phước</option>
                      <option value="Tây Ninh">Tây Ninh</option>
                      <option value="Bình Dương">Bình Dương</option>
                      <option value="Đồng Nai">Đồng Nai</option>
                      <option value="Bình Thuận">Bình Thuận</option>
                      <option value="Bà Rịa - Vũng Tàu">
                        Bà Rịa - Vũng Tàu
                      </option>
                      <option value="Long An">Long An</option>
                      <option value="Đồng Tháp">Đồng Tháp</option>
                      <option value="An Giang">An Giang</option>
                      <option value="Vĩnh Long">Vĩnh Long</option>
                      <option value="Bến Tre">Bến Tre</option>
                      <option value="Kiên Giang">Kiên Giang</option>
                      <option value="Trà Vinh">Trà Vinh</option>
                      <option value="Sóc Trăng">Sóc Trăng</option>
                      <option value="Bạc Liêu">Bạc Liêu</option>
                      <option value="Cà Mau">Cà Mau</option>
                      <option value="Điện Biên">Điện Biên</option>
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
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Hồ Chí Minh" selected>
                        Hồ Chí Minh
                      </option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Cần Thơ">Cần Thơ</option>
                      <option value="Tiền Giang">Tiền Giang</option>
                      <option value="Hậu Giang">Hậu Giang</option>
                      <option value="Đắk Nông">Đắk Nông</option>
                      <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                      <option value="Bắc Ninh">Bắc Ninh</option>
                      <option value="Hải Dương">Hải Dương</option>
                      <option value="Hưng Yên">Hưng Yên</option>
                      <option value="Hà Nam">Hà Nam</option>
                      <option value="Nam Định">Nam Định</option>
                      <option value="Thái Bình">Thái Bình</option>
                      <option value="Ninh Bình">Ninh Bình</option>
                      <option value="Hà Giang">Hà Giang</option>
                      <option value="Cao Bằng">Cao Bằng</option>
                      <option value="Lào Cai">Lào Cai</option>
                      <option value="Bắc Kạn">Bắc Kạn</option>
                      <option value="Lạng Sơn">Lạng Sơn</option>
                      <option value="Tuyên Quang">Tuyên Quang</option>
                      <option value="Yên Bái">Yên Bái</option>
                      <option value="Thái Nguyên">Thái Nguyên</option>
                      <option value="Phú Thọ">Phú Thọ</option>
                      <option value="Bắc Giang">Bắc Giang</option>
                      <option value="Quảng Ninh">Quảng Ninh</option>
                      <option value="Lai Châu">Lai Châu</option>
                      <option value="Sơn La">Sơn La</option>
                      <option value="Hòa Bình">Hòa Bình</option>
                      <option value="Thanh Hóa">Thanh Hóa</option>
                      <option value="Nghệ An">Nghệ An</option>
                      <option value="Hà Tĩnh">Hà Tĩnh</option>
                      <option value="Quảng Bình">Quảng Bình</option>
                      <option value="Quảng Trị">Quảng Trị</option>
                      <option value="Thừa Thiên Huế">Thừa Thiên - Huế</option>
                      <option value="Quảng Nam">Quảng Nam</option>
                      <option value="Quảng Ngãi">Quảng Ngãi</option>
                      <option value="Bình Ðịnh">Bình Ðịnh</option>
                      <option value="Phú Yên">Phú Yên</option>
                      <option value="Khánh Hòa">Khánh Hòa</option>
                      <option value="Kon Tum">Kon Tum</option>
                      <option value="Gia Lai">Gia Lai</option>
                      <option value="Đắk Lắk">Đắk Lắk</option>
                      <option value="Lâm Ðồng">Lâm Ðồng</option>
                      <option value="Ninh Thuận">Ninh Thuận</option>
                      <option value="Bình Phước">Bình Phước</option>
                      <option value="Tây Ninh">Tây Ninh</option>
                      <option value="Bình Dương">Bình Dương</option>
                      <option value="Đồng Nai">Đồng Nai</option>
                      <option value="Bình Thuận">Bình Thuận</option>
                      <option value="Bà Rịa - Vũng Tàu">
                        Bà Rịa - Vũng Tàu
                      </option>
                      <option value="Long An">Long An</option>
                      <option value="Đồng Tháp">Đồng Tháp</option>
                      <option value="An Giang">An Giang</option>
                      <option value="Vĩnh Long">Vĩnh Long</option>
                      <option value="Bến Tre">Bến Tre</option>
                      <option value="Kiên Giang">Kiên Giang</option>
                      <option value="Trà Vinh">Trà Vinh</option>
                      <option value="Sóc Trăng">Sóc Trăng</option>
                      <option value="Bạc Liêu">Bạc Liêu</option>
                      <option value="Cà Mau">Cà Mau</option>
                      <option value="Điện Biên">Điện Biên</option>
                    </select>
                    <label
                      for="to_province"
                      class="peer-focus:font-medium absolute text-l text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Gửi đến
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-7 group">
                    <select
                      type="text"
                      name="product_type"
                      id="product_type"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      defaultValue={"Hàng hóa"}
                      required
                    >
                      <option value="Hàng hóa" selected>
                        <span class="option-text">Hàng hóa</span>
                      </option>
                      <option value="Tài liệu">
                        <span class="option-text">Tài liệu</span>
                      </option>
                    </select>
                    <label
                      for="product_type"
                      class="peer-focus:font-medium absolute text-l text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Loại hàng gửi
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
                      Khối lượng hàng hóa (Gram)
                    </label>
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    class="text-white ml-36 mx-auto bg-main-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    TRA CỨU
                  </button>
                </form>
              </div>
              <div className="col-start-4 col-span-3">
                <img
                  class="w-3/4 mx-auto mt-[-20px] py-2"
                  src={require("../../image/ship4.png")}
                  alt="image description"
                ></img>
              </div>
              <div className="col-start-2 col-span-4">
                {shippingPrice && (
                  <div className="ml-16 mb-16">
                    <table className="w-full border-collapse mt-7 rounded-xl overflow-hidden">
                      <thead>
                        <tr className="rounded-lg shadow-lg">
                          <th className="border p-2 bg-main-300 text-white">
                            Tên dịch vụ
                          </th>
                          <th className="border p-2 bg-main-300 text-white">
                            Phí vận chuyển (VNĐ)
                          </th>
                          <th className="border p-2 bg-main-300 text-white">
                            Phụ phí (VNĐ)
                          </th>
                          <th className="border p-2 bg-main-300 text-white">
                            Tổng cộng (VNĐ)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {shippingPrice.map((shipping_price) => {
                          return (
                            <tr>
                              <td className="border p-2">
                                {shipping_price.type}
                              </td>
                              <td className="border p-2 text-center">
                                {shipping_price.shipping_fee}
                              </td>
                              <td className="border p-2 text-center">
                                {shipping_price.additional_fee}
                              </td>
                              <td className="border p-2 text-center">
                                {shipping_price.shipping_fee +
                                  shipping_price.additional_fee}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Public;
