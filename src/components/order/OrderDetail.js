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

    return (
        <div className="flex justify-center mt-8">
            <div className="p-4 border border-black w-2/3">
                <ShippingLabel
                    consignorData={orderData && orderData.consignor}
                    consigneeData={orderData && orderData.consignee}
                />
                <div>{base64Value}</div>
                <div>
                    <QRCode value={base64Value} size={156} />
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
