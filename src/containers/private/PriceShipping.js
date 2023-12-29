
import React from 'react';
import { useState } from "react";
import {withGoogleMap, GoogleMap, Marker } from "react-google-maps";


const PriceShipping = () => {
  //Dữ liệu bảng cước phí vận chuyển
  const tableData = [
    ['Dưới 10 km', '7.000 VND',],
    ['Từ 11 - 50 km', '15.000 VND'],
    ['Từ 51 - 200 km', '30.000 VND'],
    ['Trên 200km', '59.000 VND'],
  ];

  return (
    <div>
      <div class="py-8">
        <p class="text-5xl px-16 py-5 text-main-300">Magic Post</p>
        <p class="px-16 text-xl">Địa chỉ: Xuân Thủy, Cầu Giấy, Hà Nội</p>
      </div>
    <table className="w-850 mx-auto divide-y divide-gray-200 border-collapse border border-slate-500">
      <thead>
        <tr>
          <th className="px-4 py-3 text-center text-XXL font-large text-black uppercase tracking-wider">Khoảng cách</th>
          <th className="px-4 py-3 text-center text-XXL font-large text-black uppercase tracking-wider">Giá tiền</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            {row.map((cell, colIndex) => (
              <td key={colIndex} className="px-4 py-3 whitespace-nowrap text-center">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <div>
    <img class="h-auto w-1/2 mx-auto py-3" src={require('../../image/ship3.png')} alt="image description"></img>
    </div>
    </div>
  );
};

export default PriceShipping;