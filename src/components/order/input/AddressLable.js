import React from "react";
// what does && means? left && right => if(left) {right}

const AddressLabel = ({
  style,
  name,
  phone,
  address,
  city,
  district,
  ward,
  postcode,
}) => {
  const eachLine = {
    
  };
  return (
    <div style={style}>
      <p style={eachLine.styleLineHeight}>{name}</p>
      <p style={eachLine.styleLineHeight}>{phone}</p>
      <p style={eachLine.styleLineHeight}>
        {address}, {ward}, {district}, {city},
      </p>
      <p style={eachLine.styleLineHeight}>{postcode}</p>
    </div>
  );
};

//Set default props:
// Address.defaultProps = {
//   setLineHeight: {
//     lineHeight: "normal"
//   }
// };

export default AddressLabel;
