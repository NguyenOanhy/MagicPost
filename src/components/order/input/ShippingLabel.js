import React from "react";
import AddressLabel from "./AddressLable";

const ShippingLabel = ({ consignorData, consigneeData }) => {
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
          name={consignorData?.name}
          phone={consignorData?.phone}
          address={consignorData?.address}
          city={consignorData?.city}
          district={consignorData?.district}
          ward={consignorData?.ward}
          postcode={consignorData?.postcode}
          setLineHeight=".5rem"
        />
        <p style={shippingAddressStyles.shipToStyle}>SHIP TO:</p>
        <AddressLabel
          name={consigneeData?.name}
          phone={consigneeData?.phone}
          address={consigneeData?.address}
          city={consigneeData?.city}
          district={consigneeData?.district}
          ward={consigneeData?.ward}
          postcode={consigneeData?.postcode}
          style={shippingAddressStyles?.receipientStyle}
          setLineHeight="1rem"
        />
      </div>
      <div className="uuidLabel"></div>
    </div>
  );
};

export default ShippingLabel;
