import React from "react";

// const Card = ({number}) => <div className="w-100% h-48 bg-slate-300 font-3xl flex flex-col items-center justify-center">{number}</div>
const Card = ({ number, src }) => (
    <div className="w-full h-[320px] bg-slate-300 flex flex-col items-center justify-center">
      {src ? (
        <img src={src} alt={`Card ${number}`} className="w-full h-auto" />
      ) : (
        <div className="font-3xl">{number}</div>
      )}
    </div>
  );
export default Card;