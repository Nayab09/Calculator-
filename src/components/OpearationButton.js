import React from "react";
import { ACTION } from "../App";

const OperationButton =({operator,dispatch})=>{
    return(
        <button
      onClick={() => dispatch({ type: ACTION.CHOOSE_OPERATOR, payload: { operator } })}
    >
      {operator}
    </button>
    )
}

export default OperationButton;