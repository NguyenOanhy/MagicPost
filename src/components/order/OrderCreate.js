import React, { useState, useEffect } from "react";
import { AddressInputs } from "./input/AddressInputs";
import { ShippingInputs } from "./input/ShippingInputs";
import ShippingLabel from "./input/ShippingLabel";
import { v4 as uuidv4 } from "uuid";
import QRCode from "react-qr-code";
import {addOrderToFirestore, getDocumentById, updateOrderCount} from "../../firebase"
import {ProductInputs} from "./input/ProductInputs";

const OrderCreate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(); // Lấy ngày hiện tại (định dạng tùy chọn)
  const formattedTime = currentDate.toLocaleTimeString(); // Lấy thời gian hiện tại (định dạng tùy chọn)

  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  const [consignorInput, setConsignorInput] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    postcode: "",
    hub: "",
  });
  const [consigneeInput, setConsigneeInput] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    postcode: "",
    hub: "",
  });
  const [productInput, setProductInput] = useState({
    name: "",
    price: "",
    type: "",
    weight: ""
  });
  const [shippingDetailInput, setShippingDetailInput] = useState({
    shipping_price: "",
    payment_method: "",
    date: formattedDateTime,
    note: "",
  });
  const [path, setPath] = useState("");
  const [log, setLog] = useState([
    {
      createdTime: formattedDateTime,
      statusName: "Đơn hàng được tạo thành công."
    }
  ]
  );
  const [status, setStatus] = useState([0, -1, -1, -1, -1]);
  const [submittedData, setSubmittedData] = useState(null);
  const [isValidData, setIsValidData] = useState(false);
  const [base64Value, setBase64Value] = useState("");
  const [orderId, setOrderId] = useState("")
  const orderCount = async() => {
    try {
      const data = await getDocumentById("total", "order");
      const orderCount = data.count;
      setOrderId(orderCount.toString());
      console.log(orderCount);
      return orderCount;
    } catch (error) {
      console.error('Error fetching orderId:', error);
      // Handle error as needed
    }
  }
  useEffect(() => {
    orderCount();
  },[])
  const handleSubmit = () => {
    setIsValidData(true);
    convertUUIDtoBase64();
    const cleanedCityName1 = consignorInput.city.replace('Tỉnh ', '').replace('Thành phố ', '');
    const cleanedCityName2 = consigneeInput.city.replace('Tỉnh ', '').replace('Thành phố ', '');
    const pathString = `${cleanedCityName1} - ${consignorInput.hub} - ${consigneeInput.hub} - ${cleanedCityName2}`;
    // Set giá trị pathString
    console.log(pathString);
    //setPath(pathString);
    //orderCount();
    addOrderToFirestore(orderId, consignorInput, consigneeInput, productInput, shippingDetailInput, pathString, status, log, "order");
    //setOrderId(id);
    updateOrderCount(parseInt(orderId));
    setSubmittedData({
      consignor: {
        name: consignorInput.name,
        phone: consignorInput.phone,
        address: consignorInput.address,
        city: consignorInput.city,
        district: consignorInput.district,
        ward: consignorInput.ward,
        postcode: consignorInput.postcode,
      },
      consignee: {
        name: consigneeInput.name,
        phone: consigneeInput.phone,
        address: consigneeInput.address,
        city: consigneeInput.city,
        district: consigneeInput.district,
        ward: consigneeInput.ward,
        postcode: consigneeInput.postcode,
      },
    });
  };

  const convertUUIDtoBase64 = (i ) => {
    const base64 = require("uuid-base64");
    const id = base64.encode(uuidv4());
    setBase64Value(id);
  };

  return (
    <div>
      <div className="flex justify-center mt-5 ml-1">
      <div className="w-5/6 flex flex-col gap-6 border border-gray-300 p-4 rounded-lg" >
          {/* <h2 className="mt-5 text-center text-xl font-bold mb-3 text-main-300" style={{fontSize: '30px'}}>TẠO ĐƠN HÀNG MỚI</h2> */}
            <div className="flex justify-center p-4">
              <AddressInputs
                name="Người Gửi"
                userInput={consignorInput}
                setInput={setConsignorInput}
              />
            </div>
            <div className="flex justify-center p-4">
              <AddressInputs
                name="Người Nhận"
                userInput={consigneeInput}
                setInput={setConsigneeInput}
              />
            </div>
          
          {/* <div className="flex justify-center"> */}
            <div className="flex justify-center p-4">
              <ProductInputs
                name="Thông Tin Bưu Kiện"
                userInput={productInput}
                setInput={setProductInput}
              />
            </div>
            <div className="flex justify-center p-4">
              <ShippingInputs
                name="Thông Tin Vận Chuyển:"
                userInput={shippingDetailInput}
                setInput={setShippingDetailInput}
              />
            </div>
          {/* </div> */}
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-3 text-lg font-semibold text-white rounded-lg bg-main-300"
              onClick={handleSubmit}
            >
              TẠO ĐƠN HÀNG
            </button>
          </div>
          {isValidData && (
            <div className="flex justify-center mt-8">
              <div className="p-4 border border-black w-2/3">
                <ShippingLabel
                  consignorData={submittedData && submittedData.consignor}
                  consigneeData={submittedData && submittedData.consignee}
                />
                <div>{base64Value}</div>
                <div>
                  <QRCode value={base64Value} size={156} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCreate