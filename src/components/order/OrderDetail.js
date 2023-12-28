import React, { useState, useEffect } from "react";
import ShippingLabel from "./input/ShippingLabel";
import QRCode from "react-qr-code";
import { useLocation } from "react-router-dom";

const OrderDetail = () => {
    const location = useLocation();
    const { orderId, orderData } = location.state;
    const [base64Value, setBase64Value] = useState("");

    useEffect(() => {
        if (location && location.state) {
            const orderid = orderId.toString(); // Ensure orderId is a string
            console.log(orderid);

            // Combine 'MP' with orderId and encode it to base64
            const id = "MP" + orderid;
            console.log(id);
            setBase64Value(id);
        }
    }, [location, orderId]);

    if (!location || !location.state) {
        return null; // or display an error message
    }
    const VAT = (fee_1, fee_2) => {
        return (parseInt(fee_1, 10) + parseInt(fee_2, 10))*1.08;
    }

    return (
    <div>
      <div className="flex justify-center">
        <div className="w-5/6 mt-6 flex flex-col gap-5 border border-gray-300 p-3 rounded-lg">
            <div className="mt-5 p-2 mb-5">
                <div className="mb-2 border border-gray-300 border-t-0 border-r-0 border-b border-l-0 border-solid">
                    <div className="flex flex-row items-center ml-10 mb-5">
                        <img
                            class="w-28 px-3 py-0"
                            src={require("../../image/shipping_box.png")}
                            alt="image description"
                        ></img>
                        <div className="mt-3">
                            <p className="font-bold text-3xl text-blue-600 align-middle">
                                Magic Post
                            </p>
                            <div className="text-blue-600 italic">Chúng tôi không chỉ gửi hàng, chúng tôi gửi niềm tin.</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row space-x-4 mt-5 border border-gray-300 border-t-0 border-r-0 border-b border-l-0 border-solid">
                    <div className="w-1/2 ">
                        <div className="mb-2">
                            <p className="font-bold">1. Họ tên địa chỉ người gửi:</p>
                            <p>{orderData.consignor.name} - {orderData.consignor.address}, {orderData.consignor.ward}, {orderData.consignor.district}, {orderData.consignor.city}</p>
                        </div>

                        <div className="flex mb-2">
                            <p className="font-bold">Người gửi:</p>
                            <p className="ml-3">{orderData.consignor.phone}</p>
                        </div>
                        <div className="flex mb-2">
                            <p className="font-bold">Mã bưu chính:</p>
                            <p className="ml-3">{orderData.consignor.postcode}</p>
                        </div>
                    </div >
                    <div className="w-1/2 ">
                        <div className="mb-2">
                            <p className="font-bold">2. Họ tên địa chỉ người nhận:</p>
                            <p>{orderData.consignee.name} - {orderData.consignee.address}, {orderData.consignee.ward}, {orderData.consignee.district}, {orderData.consignee.city}</p>
                        </div>

                        <div className="flex mb-2">
                            <p className="font-bold">Người gửi:</p>
                            <p className="ml-3">{orderData.consignee.phone}</p>
                        </div>
                        <div className="flex mb-2">
                            <p className="font-bold">Mã bưu chính:</p>
                            <p className="ml-3">{orderData.consignee.postcode}</p>
                        </div>
                    </div >
                        
                </div>
                <div className="flex flex-row space-x-4 mt-5 border border-gray-300 border-t-0 border-r-0 border-b border-l-0 border-solid">
                    <div className="w-1/2 ">
                        <div className="flex mb-2">
                            <p className="font-bold">3. Loại hàng gửi:</p>
                            <p className="ml-3">{orderData.product.type}</p>
                        </div>

                        <div className="mb-2">
                            <p className="font-bold">4. Nội dung giá trị bưu gửi:</p>
                            <table className="w-full border border-collapse mt-2">
                                <thead>
                                    <tr>
                                        <th className="border border-2">Nội dung</th>
                                        <th className="border border-2">Số lượng</th>
                                        <th className="border border-2">Trị giá</th>
                                        <th className="border border-2">Giấy tờ đính kèm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-2">Tổng</td>
                                        <td className="border border-2">0</td>
                                        <td className="border border-2"></td>
                                        <td className="border border-2"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold">5. Dịch vụ đặc biệt/Cộng thêm:</p>
                            <p>...............................................................................................................</p>
                            <p>...............................................................................................................</p>
                            <p>Mã hợp đồng EMSC/PPA</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold">6. Chỉ dẫn của người gửi khi không chuyển phát được bưu gửi:</p>
                            <p>...............................................................................................................</p>
                        </div>
                        <div className="mb-2">
                            <p className="font-bold">7. Cam kêt của người gửi:</p>
                            <p>Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa những mặt hàng nguy hiểm, cấm gửi.</p>
                        </div>
                    </div >
                    <div className="w-1/2 flex flex-col">
                        <div className="flex flex-row border border-gray-300 border-t-0 border-r-0 border-b border-l-0 border-solid">
                            <div className="w-1/2">
                                <div className="mb-2">
                                    <p className="font-bold">8. Cước (VNĐ):</p>
                                    <p>a. Cước chính: {orderData.shipping_detail.shipping_price}</p>
                                    <p>b. Phụ phí: {orderData.shipping_detail.additional_fee}</p>
                                    <p>c. Cước GTVT: 0 </p>
                                    <p>d. Tổng cước(gồm VAT): {VAT(orderData.shipping_detail.shipping_price, orderData.shipping_detail.additional_fee)}</p>
                                    <p>e. Thu khác: 0</p>
                                    <p>f. Tổng thu: {VAT(orderData.shipping_detail.shipping_price, orderData.shipping_detail.additional_fee)}</p>
                                </div>
                            </div >
                            <div className="w-1/2 ">
                                <div className="mb-2">
                                    <p className="font-bold">9. Khối lượng (gram):</p>
                                    <p>Khối lượng thực tế: {orderData.product.weight}</p>
                                    <p>Khối lượng quy đổi: 0</p>
                                </div>
                                <div className="mb-2">
                                    <p className="font-bold">10. Thu của người nhận (VNĐ):</p>
                                    <p>COD:  {VAT(orderData.shipping_detail.shipping_price, orderData.shipping_detail.additional_fee)}</p>
                                    <p>Thu khác: {orderData.product.price}</p>
                                    <p>Tổng thu: {VAT(orderData.shipping_detail.shipping_price, orderData.shipping_detail.additional_fee) + parseInt(orderData.product.price)}</p>
                                </div>
                            </div >
                        </div>
                        <div className="mt-5">
                            <div className="mb-2">
                                <p className="font-bold">11. Chú dẫn nghiệp vụ:</p>
                                <p>...............................................................................................................</p>
                                <p>...............................................................................................................</p>
                                <p>...............................................................................................................</p>
                                <p>...............................................................................................................</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row space-x-4 mt-5">
                    <div className="w-1/3 ">
                        <div className="mb-2 ml-10">
                            <p className="font-bold ml-5">Ngày giờ gửi</p>
                            <p>{orderData.shipping_detail.date}</p>
                        </div>

                        <div className="flex mb-2 ml-10">
                            <p className="font-bold">Chữ kí người gửi</p>
                        </div>
                    </div >
                    <div className="w-1/3 ">
                        <div className="mb-2">
                            <p className="font-bold ml-5">Ngày giờ nhận </p>
                            <p>.....h...../...../...../20.....</p>
                        </div>

                        <div className=" mb-2">
                            <p className="font-bold">Chữ kí người nhận/</p>
                            <p className="font-bold ml-[-2rem]">người được ủy quyền nhận</p>
                        </div>
                    </div >
                    <div className="w-1/3 ">
                        <div>
                            <QRCode value={base64Value} size={156} />
                        </div>
                    </div >
                </div>
          {/* <div className="flex justify-center p-4">
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
          {/* <div className="flex justify-center p-4">
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
          </div> */} 
          {/* </div> */}
          
        </div>
      </div>
      </div>
          </div>

    );
};

export default OrderDetail;
