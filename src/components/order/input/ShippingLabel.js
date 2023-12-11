import React from "react";
import AddressLabel from "./AddressLable";

const ShippingLabel = ({ shipperData, recipientData }) => {
  const shippingAddressStyles = {
    label: {
      fontFamily: "sans-serif",
      fontSize: "1.2rem"
    },
    receipientStyle: {
      fontSize: "1.5rem"
    },
    shipToStyle: {
      marginTop: "2.5rem",
      marginBottom: ".5rem",
      fontSize: "1.2rem"
    }
  };

  return (
    <div style={shippingAddressStyles.label}>
      <div className="shippingAddress">
        <AddressLabel
          name={shipperData.name}
          streetLine1={shipperData.streetLine1}
          streetLine2={shipperData.streetLine2}
          city={shipperData.city}
          state={shipperData.state}
          zip={shipperData.zip}
          setLineHeight=".5rem"
        />
        <p style={shippingAddressStyles.shipToStyle}>SHIP TO:</p>
        <AddressLabel
          name={recipientData.name}
          streetLine1={recipientData.streetLine1}
          streetLine2={recipientData.streetLine2}
          city={recipientData.city}
          state={recipientData.state}
          zip={recipientData.zip}
          style={shippingAddressStyles.receipientStyle}
          setLineHeight="1rem"
        />
      </div>
      <div className="uuidLabel"></div>
    </div>
  );
};

export default ShippingLabel;
