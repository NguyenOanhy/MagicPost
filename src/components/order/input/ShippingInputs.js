import React from "react";
import { Input } from "./Input";

export const ShippingInputs = ({ name, userInput, setInput}) => {
  const eachInputBox = {
    //style the div that contains all the six stacks of inputs
    marginLeft: '1.5rem'
  };
  const handleTimeChange = (e) => {
    setInput({ ...userInput, date: e.target.value });
  };
  return (
    <div style={eachInputBox}>
      <h2 className="font-bold border-t-0 border-r-0 border-b border-l-0 border-solid pb-2 mb-2" style={{fontSize:'19px', color: '#4991FC', borderColor: '#3780ED'}}>{name}</h2>
      <Input
        //shipping_price
        type="text"
        placeholder="Cước phí vận chuyển"
        onChangeOne={(e) => setInput({ ...userInput, shipping_price: e.target.value })}
        value={userInput.shipping_price}
      />
      <Input
        //payment_method
        type="text"
        placeholder="Hình thức thanh toán"
        onChange={(e) =>
          setInput({ ...userInput, payment_method: e.target.value })
        }
        value={userInput.payment_method}
      />
      <input
        type="datetime-local"
        className="w-96 h-12 border border-solid border-gray-300 p-2 mt-2 mb-0.5 mr-4 rounded-lg"
        style={{borderColor: '#4991FC'}}
        placeholder="Ngày nhận đơn"
        onChange={(e) => handleTimeChange(e)}
        value={userInput.date}
      />
      <Input
        //note
        type="text"
        placeholder="Ghi chú"
        onChange={(e) => setInput({ ...userInput, note: e.target.value })}
        value={userInput.note}
      />
    </div>
  );
};
