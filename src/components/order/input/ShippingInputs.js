import React from "react";
import { InputFourStacksForm } from "./InputForm";

export const ShippingInputs = ({ name, userInput, setInput }) => {
  const eachInputBox = {
    //style the div that contains all the six stacks of inputs
  };
  return (
    <div style={eachInputBox}>
      <h1>{name}</h1>
      <InputFourStacksForm
        //shipping_price
        typeOne="text"
        placeholderOne="Cước phí vận chuyển"
        onChangeOne={(e) => setInput({ ...userInput, shipping_price: e.target.value })}
        valueOne={userInput.name}
        //payment_method
        typeTwo="text"
        placeholderTwo="Hình thức thanh toán"
        onChangeTwo={(e) =>
          setInput({ ...userInput, payment_method: e.target.value })
        }
        valueTwo={userInput.streetLine1}
        //date
        typeThree="date"
        placeholderThree="Ngày nhận đơn"
        onChangeThree={(e) =>
          setInput({ ...userInput, date: e.target.value })
        }
        valueThree={userInput.streetLine2}
        //note
        typeFour="text"
        placeholderFour="Ghi chú"
        onChangeFour={(e) => setInput({ ...userInput, note: e.target.value })}
        valueFour={userInput.city}
      />
    </div>
  );
};
