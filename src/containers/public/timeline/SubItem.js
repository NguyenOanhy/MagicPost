import React from "react";
import "./index.scss";

export const SubItem = ({ data, index, count }) => (
  <div className="subitem">
    <div className="subitem-content flex-col">   
      {data.title !== null && (
        <>
          <p class="mt-[-5px] text-[16px] font-bold mb-1" style={{color: '#4991FC'}}>{data.title}</p>
          {/* Additional content for key === 0 */}
        </>
      )} 
      <p class="text-base leading-6">{data.createdTime}: {data.statusName}<br /></p>
      {index !== count - 1 ? (
        <>
          <span className="circle"></span>
        </>
      ) : (
        <>
          <span className="circle"><span className="circle2"></span></span>           
        </>
      )}
      {/* <span className="circle"></span> */}
    </div>
  </div>
);
