import React, { useState, useEffect } from "react";
import { AddressInputs } from "./input/AddressInputs";
import { ShippingInputs } from "./input/ShippingInputs";
import ShippingLabel from "./input/ShippingLabel";
import { v4 as uuidv4 } from "uuid";
import QRCode from "react-qr-code";
import {addOrderToFirestore} from "../../firebase"
import {ProductInputs} from "./input/ProductInputs";

const OrderCreate = () => {
  const [consignorInput, setConsignorInput] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    postcode: "",
    email: "",
  });
  const [consigneeInput, setConsigneeInput] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    postcode: "",
    email: "",
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
    date: "",
    note: "",
  });
  const [path, setPath] = useState({
    start_trans_point: "",
    start_hub: "",
    end_trans_point: "",
    end_hub: "",
  });
  const [status, setStatus] = useState(['1', '0', '0', '0']);
  const [submittedData, setSubmittedData] = useState(null);
  const [isValidData, setIsValidData] = useState(false);
  const [base64Value, setBase64Value] = useState("");
  const [orderId, setOrderId] = useState("")

  const handleSubmit = () => {
    setIsValidData(true);
    convertUUIDtoBase64();
    const id = addOrderToFirestore(consignorInput, consigneeInput, productInput, shippingDetailInput, path, status, "order");
    setOrderId(id);
    setSubmittedData({
      consignor: {
        name: consignorInput.name,
        phone: consignorInput.phone,
        address: consignorInput.address,
        city: consignorInput.city,
        district: consignorInput.district,
        ward: consignorInput.ward,
        postcode: consignorInput.postcode,
        email: consignorInput.email
      },
      consignee: {
        name: consigneeInput.name,
        phone: consigneeInput.phone,
        address: consigneeInput.address,
        city: consigneeInput.city,
        district: consigneeInput.district,
        ward: consigneeInput.ward,
        postcode: consigneeInput.postcode,
        email: consigneeInput
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
      <div className="w-5/6 border border-gray-300 p-4 rounded-lg" >
          <h2 className="mt-5 text-center text-xl font-bold mb-3 text-main-300" style={{fontSize: '30px'}}>TẠO ĐƠN HÀNG MỚI</h2>
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