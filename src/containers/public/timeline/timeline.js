import React from "react";
import "./index.scss";
import { SubItem } from "./SubItem";

export const Timeline = ({ data }) => (
  data.length > 0 && (
    <div className="timeline-container">
      {data.map((item, index) => (
        <SubItem data={item} index={index} count={data.length} key={index} />
      ))}
    </div>
  )
);
