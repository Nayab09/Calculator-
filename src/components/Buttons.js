import React from "react";
import { ACTION } from "../App";

const Button = ({ dispatch, digit }) => {
  return (
    <button
      onClick={() => dispatch({ type: ACTION.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
};

export default Button;
