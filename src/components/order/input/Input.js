import React from "react";

export const Input = ({ type, placeholder, onChange, value }) => {
  const eachInput = {
    width: "24rem",
    height: "3rem",
    border: "1px solid",
    borderColor: '#3780ED',
    padding: "0.8rem",
    marginTop: "0.5rem",
    marginBottom: "0.1rem",
    marginRight: "1rem",
    borderRadius: "0.5rem",
  };
  return (
    <input
      style={eachInput}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
