import React from "react";
import { Input } from "./Input";

export const InputFiveStacksForm = ({
  typeOne,
  typeTwo,
  typeThree,
  typeFour,
  typeFive,
  placeholderOne,
  placeholderTwo,
  placeholderThree,
  placeholderFour,
  placeholderFive,
  onChangeOne,
  onChangeTwo,
  onChangeThree,
  onChangeFour,
  onChangeFive,
  valueOne,
  valueTwo,
  valueThree,
  valueFour,
  valueFive,
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
    </div>
  );
};

export const InputFourStacksForm = ({
  typeOne,
  typeTwo,
  typeThree,
  typeFour,
  placeholderOne,
  placeholderTwo,
  placeholderThree,
  placeholderFour,
  onChangeOne,
  onChangeTwo,
  onChangeThree,
  onChangeFour,
  valueOne,
  valueTwo,
  valueThree,
  valueFour,
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
    </div>
  );
};
