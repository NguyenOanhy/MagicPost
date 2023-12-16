import {React, useEffect, useState, useCallback} from "react";
import { Input } from "./Input";
import {db, getDocumentById} from "../../../firebase";
import {collection, getDocs} from "firebase/firestore";

export const AddressInputs = ({ name, userInput, setInput }) => {
  const [areas, setAreas] = useState([])
  useEffect(() => {
    getArea();
  }, []);
  function getArea() {
    const areaRef = collection(db, 'trans_point')
    getDocs(areaRef)
      .then(Response => {
        const area = Response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))
        setAreas(area) 
      })
      .catch(error => console.log(error.message))
  }
  const eachInputBox = {
    //style the div that contains all the six stacks of inputs
    marginLeft: '1.5rem'
  };
  const handleAreaChange = useCallback(
    (selectedArea) => {
      const selectedAreaInfo = areas.find((area) => area.id === selectedArea);
      setInput({
        ...userInput,
        area: selectedAreaInfo.id,
        postcode: selectedAreaInfo.data.postcode,
      });
    },
    [areas, setInput, userInput],
  );
  
  return (
    <div style={eachInputBox}>
      <h2 className="font-bold border-t-0 border-r-0 border-b border-l-0 border-solid pb-2 mb-2" style={{fontSize:'19px', color: '#4991FC', borderColor: '#4991FC'}}>{name}</h2>
      <Input
        //name
        type="text"
        placeholder="Họ và tên"
        onChange={(e) => setInput({ ...userInput, name: e.target.value })}
        value={userInput.name}
      />
      <Input
        //phone
        type="text"
        placeholder="Số điện thoại"
        onChange={(e) =>
          setInput({ ...userInput, phone: e.target.value })
        }
        value={userInput.phone}
      />
      <Input
        //address
        type="text"
        placeholder="Địa chỉ"
        onChange={(e) =>
          setInput({ ...userInput, address: e.target.value })
        }
        value={userInput.address}
      />
      
      <select
      className="w-96 h-12 border border-solid p-2 mt-2 mb-0.5 mr-4 rounded-lg"
      style={{borderColor: '#4991FC'}}
      placeholder="Tỉnh/thành phố"
      onChange={(e) => handleAreaChange(e.target.value)}
      value={userInput.area}
      >
      <option value="">Chọn tỉnh/thành phố</option>
      {areas.map(area => (
                  <option key={area.id} value={area.id}>{area.id}</option>
      ))} 
      </select>
      
      <Input
        //email
        type="text"
        placeholder="Email"
        onChange={(e) =>
          setInput({ ...userInput, email: e.target.value })
        }
        value={userInput.email}
      />

      <Input
        //zipcode
        type="text"
        placeholder="Mã bưu chính"
        onChange={(e) => setInput({ ...userInput, postcode: e.target.value })}
        value={userInput.postcode}
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
