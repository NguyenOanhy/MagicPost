import React from "react";
import { InputSixStacksForm } from "./InputSixStackForm";

export const AddressInputs = ({ name, userInput, setInput }) => {
  const eachInputBox = {
    //style the div that contains all the six stacks of inputs
  };
  return (
    <div style={eachInputBox}>
      <h1>{name}</h1>
      <InputSixStacksForm
        //Name/Company
        typeOne="text"
        placeholderOne="Name / Company"
        onChangeOne={(e) => setInput({ ...userInput, name: e.target.value })}
        valueOne={userInput.name}
        //Street Line 1
        typeTwo="text"
        placeholderTwo="Street Line 1"
        onChangeTwo={(e) =>
          setInput({ ...userInput, streetLine1: e.target.value })
        }
        valueTwo={userInput.streetLine1}
        //Street Line 2
        typeThree="text"
        placeholderThree="Street Line 2"
        onChangeThree={(e) =>
          setInput({ ...userInput, streetLine2: e.target.value })
        }
        valueThree={userInput.streetLine2}
        //City
        typeFour="text"
        placeholderFour="City"
        onChangeFour={(e) => setInput({ ...userInput, city: e.target.value })}
        valueFour={userInput.city}
        //State
        typeFive="text"
        placeholderFive="State"
        onChangeFive={(e) => setInput({ ...userInput, state: e.target.value })}
        valueFive={userInput.state}
        //Zip
        typeSix="text"
        placeholderSix="Zip"
        onChangeSix={(e) => setInput({ ...userInput, zip: e.target.value })}
        valueSix={userInput.zip}
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
