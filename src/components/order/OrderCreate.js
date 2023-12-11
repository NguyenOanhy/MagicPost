import React, { useState, useEffect } from "react";
import { AddressInputs } from "./input/AddressInputs";
import ShippingLabel from "./input/ShippingLabel";
import { v4 as uuidv4 } from "uuid";
import QRCode from "react-qr-code";

const OrderCreate = () => {
  const [shipperInput, setShipperInput] = useState({
    name: "",
    streetLine1: "",
    streetLine2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [recipientInput, setRecipientInput] = useState({
    name: "",
    streetLine1: "",
    streetLine2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [isValidData, setIsValidData] = useState(false);
  const [base64Value, setBase64Value] = useState("");

  const handleSubmit = () => {
    setIsValidData(true);
    convertUUIDtoBase64();
    setSubmittedData({
      shipper: {
        name: shipperInput.name,
        streetLine1: shipperInput.streetLine1,
        streetLine2: shipperInput.streetLine2,
        city: shipperInput.city,
        state: shipperInput.state,
        zip: shipperInput.zip,
      },
      recipient: {
        name: recipientInput.name,
        streetLine1: recipientInput.streetLine1,
        streetLine2: recipientInput.streetLine2,
        city: recipientInput.city,
        state: recipientInput.state,
        zip: recipientInput.zip,
      },
    });
  };

  const convertUUIDtoBase64 = () => {
    const base64 = require("uuid-base64");
    const id = base64.encode(uuidv4());
    setBase64Value(id);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="p-4">
          <AddressInputs
            name="Shipper:"
            userInput={shipperInput}
            setInput={setShipperInput}
          />
        </div>
        <div className="p-4">
          <AddressInputs
            name="Recipient:"
            userInput={recipientInput}
            setInput={setRecipientInput}
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg"
          onClick={handleSubmit}
        >
          GENERATE LABEL
        </button>
      </div>
      {isValidData && (
        <div className="flex justify-center mt-8">
          <div className="p-4 border border-black w-96 h-64">
            <ShippingLabel
              shipperData={submittedData && submittedData.shipper}
              recipientData={submittedData && submittedData.recipient}
            />
            <div>{base64Value}</div>
            <div>
              <QRCode value={base64Value} size={156} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderCreate