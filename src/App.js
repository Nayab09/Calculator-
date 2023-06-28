import { useReducer } from "react";
import Button from "./components/Buttons";
import OperationButton from "./components/OpearationButton";

export const ACTION = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE: "delete",
  CHOOSE_OPERATOR: "choose-operator",
  EQUALS: "equals",
};
const evaluate = ({ current, previous, operator }) => {
  const pre = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(pre) || isNaN(curr)) return "";
  let computation = "";
  switch (operator) {
    case "+":
      computation = pre + curr;
      break;
    case "-":
      computation = pre - curr;
      break;
    case "*":
      computation = pre * curr;
      break;
    case "÷":
      computation = pre / curr;
      break;
    default:
      computation = "";
      break;
  }
  return computation.toString();
};

function App() {
  const [{ current, previous, operator }, dispatch] = useReducer(reducer, {});

  function reducer(state, { type, payload }) {
    switch (type) {
      case ACTION.ADD_DIGIT:
        if (state.overwrite)
          return {
            ...state,
            current: payload.digit,
            overwrite: false,
          };
        if (payload.digit === "0" && state.current === "0") return state;
        if (payload.digit === "." && state.current.includes(".")) return state;
        return {
          ...state,
          current: `${state.current || ""}${payload.digit}`,
        };
      case ACTION.CLEAR: {
        return {};
      }

      case ACTION.CHOOSE_OPERATOR:
        {
          if (state.current == null && state.previous == null) return state;
          if (state.previous == null)
            return {
              ...state,
              operator: payload.operator,
              previous: state.current,
              current: null,
            };
          //  if(state.current == null)
          //  return{
          //   operator:payload.operator,
          //  }
        }
        return {
          ...state,
          previous: evaluate(state),
          current: null,
          operator: payload.operator,
        };
      case ACTION.EQUALS:
        if (
          state.current == null ||
          state.previous == null ||
          state.operator == null
        )
          return state;

        return {
          ...state,
          previous: null,
          overwrite: true,
          operator: null,
          current: evaluate(state),
        };
      case ACTION.DELETE:
        if (state.overwrite)
          return {
            ...state,
            overwrite: false,
            current: null,
          };
        if (state.current == null) return state;
        if (state.current.length === 1)
          return {
            ...state,
            current: null,
          };

        return {
          ...state,
          current: state.current.slice(0, -1),
        };
    }
  }

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous">
          {previous}
          {operator}
        </div>
        <div className="current">{current}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTION.CLEAR })}
      >
        {" "}
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTION.DELETE })}>DEL</button>
      <OperationButton operator="÷" dispatch={dispatch} />
      <Button dispatch={dispatch} digit="1" />
      <Button dispatch={dispatch} digit="2" />
      <Button dispatch={dispatch} digit="3" />
      <OperationButton operator="*" dispatch={dispatch} />
      <Button dispatch={dispatch} digit="4" />
      <Button dispatch={dispatch} digit="5" />
      <Button dispatch={dispatch} digit="6" />
      <OperationButton operator="+" dispatch={dispatch} />
      <Button dispatch={dispatch} digit="7" />
      <Button dispatch={dispatch} digit="8" />
      <Button dispatch={dispatch} digit="9" />
      <OperationButton operator="-" dispatch={dispatch} />
      <Button dispatch={dispatch} digit="0" />
      <Button dispatch={dispatch} digit="." />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTION.EQUALS })}
      >
        =
      </button>
    </div>
  );
}

export default App;
