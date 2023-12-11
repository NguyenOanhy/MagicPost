import React from "react";
import { Input } from "./Input";

export const InputSixStacksForm = ({
  typeOne,
  typeTwo,
  typeThree,
  typeFour,
  typeFive,
  typeSix,
  placeholderOne,
  placeholderTwo,
  placeholderThree,
  placeholderFour,
  placeholderFive,
  placeholderSix,
  onChangeOne,
  onChangeTwo,
  onChangeThree,
  onChangeFour,
  onChangeFive,
  onChangeSix,
  valueOne,
  valueTwo,
  valueThree,
  valueFour,
  valueFive,
  valueSix
}) => {
  const eachInputForm = {
    display: "flex",
    flexDirection: "column"
  };
  return (
    <div style={eachInputForm}>
      <Input
        type={typeOne}
        placeholder={placeholderOne}
        onChange={onChangeOne}
        value={valueOne}
      />
      <Input
        type={typeTwo}
        placeholder={placeholderTwo}
        onChange={onChangeTwo}
        value={valueTwo}
      />
      <Input
        type={typeThree}
        placeholder={placeholderThree}
        onChange={onChangeThree}
        value={valueThree}
      />
      <Input
        type={typeFour}
        placeholder={placeholderFour}
        onChange={onChangeFour}
        value={valueFour}
      />
      <Input
        type={typeFive}
        placeholder={placeholderFive}
        onChange={onChangeFive}
        value={valueFive}
      />
      <Input
        type={typeSix}
        placeholder={placeholderSix}
        onChange={onChangeSix}
        value={valueSix}
      />
    </div>
  );
};
