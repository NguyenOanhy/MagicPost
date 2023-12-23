import {React, useEffect, useState} from "react";
import { Input } from "./Input";
import axios from 'axios';
import { getDocumentById } from "../../../firebase";

export const AddressInputs = ({ name, userInput, setInput }) => {
  const host = 'https://provinces.open-api.vn/api/';
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    callAPI(`${host}?depth=1`, setCities);
  }, [host]);
  const callAPI = (api, callback) => {
    axios.get(api)
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const callApiDistrict = (cityCode) => {
    const api = `${host}p/${cityCode}?depth=2`;
    callAPI(api, (data) => setDistricts(data.districts || []));
  };

  const callApiWard = (districtCode) => {
    const api = `${host}d/${districtCode}?depth=2`;
    callAPI(api, (data) => setWards(data.wards || []));
  };
  
  const handleCityChange = async (value) => {
    const [cityCode, cityName] = value.split('|');
    const cleanedCityName = cityName.replace('Tỉnh ', '').replace('Thành phố ', '');
  
    try {
      const data = await getDocumentById(cleanedCityName, 'trans_point');
      setInput({ ...userInput, city: cityName, postcode: data.postcode, hub: data.hub});
      console.log(data);
  
      if (cityCode !== '') {
        callApiDistrict(cityCode);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      // Handle error as needed
    }
  };
  const handleDistrictChange = (value) => {
    const [districtCode, districtName] = value.split('|');
    setInput({ ...userInput, district: districtName });
    if (districtCode !== '') {
      callApiWard(districtCode);
    }
  };

  const handleWardChange = (e) => {
    setInput({ ...userInput, ward: e.target.value });
  };
  const eachInputBox = {
    //style the div that contains all the six stacks of inputs
    marginLeft: '1.5rem'
  };
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
      onChange={(e) => handleCityChange(e.target.value)}
      // value={userInput.city_code}
      >
      <option value="">Chọn tỉnh/thành phố</option>
        {cities.map((city) => (
          <option key={city.code} value={`${city.code}|${city.name}`}>{city.name}</option>
        ))} 
      </select>
      <select
      className="w-96 h-12 border border-solid p-2 mt-2 mb-0.5 mr-4 rounded-lg"
      style={{borderColor: '#4991FC'}}
      placeholder="Quận/huyện"
      onChange={(e) => handleDistrictChange(e.target.value)}
      //value={userInput.district_code}
      >
      <option value="">Chọn quận/huyện</option>
      {districts.map((district) => (
          <option key={district.code} value={`${district.code}|${district.name}`}>{district.name}</option>
        ))}
      </select>
      <select
      className="w-96 h-12 border border-solid p-2 mt-2 mb-0.5 mr-4 rounded-lg"
      style={{borderColor: '#4991FC'}}
      placeholder="Phường/xã"
      onChange={handleWardChange}
      //value={userInput.ward_code}
      >
      <option value="">Chọn phường/xã</option>
      {wards.map((ward) => (
          <option key={ward.code} value={ward.name}>{ward.name}</option>
        ))}
      </select>
    </div>
      
  );
};

