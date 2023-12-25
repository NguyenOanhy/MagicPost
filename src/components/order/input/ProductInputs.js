import React from "react";
import { Input } from "./Input";

export const ProductInputs = ({ name, userInput, setInput }) => {
  const eachInputBox = {
    //style the div that contains all the six stacks of inputs
    marginLeft: '1.5rem'
  };
  return (
    <div style={eachInputBox}>
      <h2 className="font-bold border-t-0 border-r-0 border-b border-l-0 border-solid pb-2 mb-2" style={{fontSize:'19px', color: '#4991FC', borderColor: '#4991FC'}}>{name}</h2>
      <Input
        //Product's name
        type="text"
        placeholder="Tên hàng gửi"
        onChange={(e) => setInput({ ...userInput, name: e.target.value })}
        value={userInput.name}
      />
      <Input
        //Product's price
        type="text"
        placeholder="Giá trị hàng gửi"
        onChange={(e) =>
          setInput({ ...userInput, price: e.target.value })
        }
        value={userInput.price}
      />
      <select
      className="w-80 h-10 border border-solid p-2 mt-2 mb-0.5 mr-4 rounded-lg"
      style={{borderColor: '#4991FC'}}
      placeholder="Loại hàng gửi"
      onChange={(e) =>
        setInput({ ...userInput, type: e.target.value })
      }
      //value={userInput.ward_code}
      >
        <option value="">Chọn loại hàng gửi</option>
        <option value="Tài liệu">Tài liệu</option>
        <option value="Hàng hóa">Hàng hóa</option>
      </select>

      <Input
        //Product's weight
        type="text"
        placeholder="Khối lượng hàng gửi (gram)"
        onChange={(e) => setInput({ ...userInput, weight: e.target.value })}
        value={userInput.weight}
      />
    </div>
  );
};
