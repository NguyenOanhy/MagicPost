import React from "react";
import { InputFiveStacksForm } from "./InputForm";

export const AddressInputs = ({ name, userInput, setInput }) => {
  const eachInputBox = {
    //style the div that contains all the six stacks of inputs
  };
  return (
    <div style={eachInputBox}>
      <h1>{name}</h1>
      <InputFiveStacksForm
        //name
        typeOne="text"
        placeholderOne="Họ và tên"
        onChangeOne={(e) => setInput({ ...userInput, name: e.target.value })}
        valueOne={userInput.name}
        //phone
        typeTwo="text"
        placeholderTwo="Số điện thoại"
        onChangeTwo={(e) =>
          setInput({ ...userInput, phone: e.target.value })
        }
        valueTwo={userInput.streetLine1}
        //address
        typeThree="text"
        placeholderThree="Địa chỉ"
        onChangeThree={(e) =>
          setInput({ ...userInput, address: e.target.value })
        }
        valueThree={userInput.streetLine2}
        //city/province
        typeFour="text"
        placeholderFour="Tỉnh/thành phố"
        onChangeFour={(e) => setInput({ ...userInput, area: e.target.value })}
        valueFour={userInput.city}
        //zipcode
        typeFive="text"
        placeholderFive="Mã bưu chính"
        onChangeFive={(e) => setInput({ ...userInput, postcode: e.target.value })}
        valueFive={userInput.state}
      />
    </div>
  );
};

/*
  setName,
  setStreetLine1,
  setStreetLine2,
  setCity,
  setState,
  setZip,
  valueName,
  valueStreetLine1,
  valueStreetLine2,
  valueCity,
  valueState,
  valueZip
  
<AddressInputs
  mainLabel="Shipper:"
  onChangeName={(e) =>
    setShipperInput({ ...shipperInput, name: e.target.value })
  }
  onChangeStreetLine1={(e) =>
    setShipperInput({ ...shipperInput, streetLine1: e.target.value })
  }
  valueName={shipperInput.name}
  valueStreetLine1={shipperInput.streetLine1}
/>
<Input
        type="text"
        placeholder="Name / Company"
        onChange={onChange}
        value={value}
      />
*/
