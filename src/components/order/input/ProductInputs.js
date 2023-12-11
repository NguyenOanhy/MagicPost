import React from "react";
import { InputFourStacksForm } from "./InputForm";

export const ProductInputs = ({ name, userInput, setInput }) => {
  const eachInputBox = {
    //style the div that contains all the six stacks of inputs
  };
  return (
    <div style={eachInputBox}>
      <h1>{name}</h1>
      <InputFourStacksForm
        //Product's name
        typeOne="text"
        placeholderOne="Tên hàng gửi"
        onChangeOne={(e) => setInput({ ...userInput, name: e.target.value })}
        valueOne={userInput.name}
        //Product's price
        typeTwo="text"
        placeholderTwo="Giá trị hàng gửi"
        onChangeTwo={(e) =>
          setInput({ ...userInput, price: e.target.value })
        }
        valueTwo={userInput.streetLine1}
        //Product's type
        typeThree="text"
        placeholderThree="Loại hàng gửi"
        onChangeThree={(e) =>
          setInput({ ...userInput, type: e.target.value })
        }
        valueThree={userInput.streetLine2}
        //Product's weight
        typeFour="text"
        placeholderFour="Khối lượng hàng gửi"
        onChangeFour={(e) => setInput({ ...userInput, weight: e.target.value })}
        valueFour={userInput.city}
      />
    </div>
  );
};
