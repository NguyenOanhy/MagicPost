import React from "react";
// what does && means? left && right => if(left) {right}

const AddressLabel = ({
  name,
  streetLine1,
  streetLine2,
  city,
  state,
  zip,
  style,
  setLineHeight
}) => {
  const eachLine = {
    styleLineHeight: {
      lineHeight: setLineHeight
    }
  };
  return (
    <div style={style}>
      <p style={eachLine.styleLineHeight}>{name}</p>
      <p style={eachLine.styleLineHeight}>{streetLine1}</p>
      {streetLine2 && <p>{streetLine2}</p>}
      <p style={eachLine.styleLineHeight}>
        {city}, {state}
      </p>
      <p style={eachLine.styleLineHeight}>{zip}</p>
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
