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
      <select
      className="w-80 h-10 border border-solid p-2 mt-2 mb-0.5 mr-4 rounded-lg"
      style={{borderColor: '#4991FC'}}
      placeholder="Dịch vụ chuyển phát"
      onChange={(e) =>
        setInput({ ...userInput, type: e.target.value })
      }
      value={userInput.type}
      >
        <option value="">Chọn dịch vụ chuyển phát</option>
        <option value="Chuyển phát nhanh">Chuyển phát nhanh</option>
        <option value="Chuyển phát thường">Chuyển phát thường</option>
      </select>
      <select
      className="w-80 h-10 border border-solid p-2 mt-2 mb-0.5 mr-4 rounded-lg"
      style={{borderColor: '#4991FC'}}
      placeholder="Hình thức thanh toán"
      onChange={(e) =>
        setInput({ ...userInput, payment_method: e.target.value })
      }
      value={userInput.payment_method}
      >
        <option value="">Chọn hình thức thanh toán</option>
        <option value="Trả bởi người người gửi">Trả bởi người người gửi</option>
        <option value="Trả bởi người nhận">Trả bởi người nhận</option>
      </select>
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
