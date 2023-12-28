import React, { useState, useEffect } from "react";
import { AddressInputs } from "./input/AddressInputs";
import { useNavigate } from "react-router-dom";
import { ShippingInputs } from "./input/ShippingInputs";
import {
  addOrderToFirestore,
  getDocumentById,
  updateOrderCount,
  getShippingFee,
} from "../../firebase";
import { ProductInputs } from "./input/ProductInputs";

const OrderCreate = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(); // Lấy ngày hiện tại (định dạng tùy chọn)
  const formattedTime = currentDate.toLocaleTimeString(); // Lấy thời gian hiện tại (định dạng tùy chọn)
  const estimatedDate = new Date(currentDate);
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
    weight: "",
  });
  const [shippingDetailInput, setShippingDetailInput] = useState({
    shipping_price: "",
    additional_fee: "",
    total_fee: "",
    payment_method: "",
    date: formattedDateTime,
    note: "",
    type: "",
    shipping_date: "",
    estimated_date: "",
  });
  const [log, setLog] = useState([
    {
      createdTime: formattedDateTime,
      statusName: "Đơn hàng được tạo thành công."
    }
  ]
  );
  function addDays(inputDate, numberOfDays) {
    // Chuyển đổi chuỗi ngày thành đối tượng Date
    var dateParts = inputDate.split("/");
    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; // Tháng trong JavaScript là từ 0 đến 11
    var year = parseInt(dateParts[2], 10);
  
    var currentDate = new Date(year, month, day);
  
    // Thêm n ngày
    currentDate.setDate(currentDate.getDate() + numberOfDays);
  
    // Format ngày mới và trả về
    var newDay = currentDate.getDate();
    var newMonth = currentDate.getMonth() + 1; // Phải cộng thêm 1 vì tháng bắt đầu từ 0
    var newYear = currentDate.getFullYear();
  
    // Đảm bảo hiển thị đúng định dạng 2 chữ số cho ngày và tháng
    newDay = newDay < 10 ? "0" + newDay : newDay;
    newMonth = newMonth < 10 ? "0" + newMonth : newMonth;
  
    return newDay + "/" + newMonth + "/" + newYear;
  }
  const [status, setStatus] = useState([0, -1, -1, -1, -1]);
  const [submittedData, setSubmittedData] = useState(null);
  const [isValidData, setIsValidData] = useState(false);
  const [orderId, setOrderId] = useState("");
  const orderCount = async () => {
    try {
      const data = await getDocumentById("total", "order");
      const orderCount = data.count;
      setOrderId(orderCount.toString());
      console.log(orderCount);
      return orderCount;
    } catch (error) {
      console.error("Error fetching orderId:", error);
      // Handle error as needed
    }
  };
  useEffect(() => {
    orderCount();
  }, []);
  const handleSubmit = async () => {
    setIsValidData(true);
    const cleanedCityName1 = consignorInput.city
      .replace("Tỉnh ", "")
      .replace("Thành phố ", "");
    const cleanedCityName2 = consigneeInput.city
      .replace("Tỉnh ", "")
      .replace("Thành phố ", "");
    const pathString = `${cleanedCityName1} - ${consignorInput.hub} - ${consigneeInput.hub} - ${cleanedCityName2}`;
    const fee = await getShippingFee(
      cleanedCityName1,
      cleanedCityName2,
      productInput.weight,
      productInput.type,
      shippingDetailInput.type,
      productInput.price
    );
    console.log(fee);
    var shipping_detail = shippingDetailInput;
    shipping_detail.shipping_price = fee[0];
    shipping_detail.additional_fee = fee[1];
    shipping_detail.total_fee = fee[2];
    shipping_detail.estimated_date =  addDays(formattedDate, fee[3]);
  
    //setShippingDetailInput({shipping_price: fee[0], additional_fee: fee[1], total_fee: fee[2], estimated_date: estimatedDate.getDate() + fee[3]});
    await addOrderToFirestore(
      orderId,
      consignorInput,
      consigneeInput,
      productInput,
      shipping_detail,
      pathString,
      status,
      log,
      "order"
    );
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

  const handleOnClick = () => {
    navigate(`/private/orders/${orderId}`, {
      state: {
        orderId: orderId,
        orderData: submittedData,
      },
    });
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[765px] mt-6 flex flex-col gap-5 border border-gray-300 p-4 rounded-lg">
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
            <div className="flex justify-center mt-4" style={{ cursor: 'pointer' }}>
              <div onClick={handleOnClick} style={{ color: 'blue', textDecoration: 'underline' }}>Xem thông tin chi tiết tại đây</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCreate;
