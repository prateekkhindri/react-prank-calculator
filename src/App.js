import { useState } from "react";
import "./App.css";
import { Buttons } from "./components/Buttons";
import { Display } from "./components/Display";
import { Title } from "./components/Title";

const operators = ["+", "-", "/", "*"];

const App = () => {
  const [textToDisplay, setTextToDisplay] = useState("");

  // 7. Not being able to use "." more than once
  const [lastOperator, setLastOperator] = useState("");

  const handleOnClick = (val) => {
    // 8. Allow 0 to be entered before "." only and not in succession and also being able to calculate the total
    if (operators.includes(val) || val === "=") {
      const lastOperatorIndex = lastOperator
        ? textToDisplay.lastIndexOf(lastOperator) + 1
        : 0;

      const firstNumberSet = textToDisplay.substring(0, lastOperatorIndex);

      const lastNumberSet = textToDisplay.slice(lastOperatorIndex);

      const str = firstNumberSet + parseFloat(lastNumberSet); // Octal  case

      if (val === "=") {
        return onTotal(str);
      }

      setTextToDisplay(str + val);

      setLastOperator(val);
      return;
    }

    // 7. Not being able to use "." more than once
    if (operators.includes(val)) {
      setLastOperator(val);
    }

    // 7. Not being able to use "." more than once
    // We need to have only one "." per number set
    if (val === ".") {
      // 7.1 We need the index of the last operator or 0
      const lastOperatorIndex = lastOperator
        ? textToDisplay.lastIndexOf(lastOperator) + 1
        : 0;

      const lastNumberSet = textToDisplay.slice(lastOperatorIndex);

      if (lastNumberSet.includes(".")) {
        return;
      }

      //   if (lastOperator) {
      //     const lastOperatorIndex = textToDisplay.lastIndexOf(lastOperator);
      //     const lastNumberSet = textToDisplay.slice(lastOperatorIndex + 1);

      //     if (lastNumberSet.includes(".")) {
      //       return;
      //     }
      //   } else {
      //     if (textToDisplay.includes(".")) {
      //       return;
      //     }
      //   }
    }

    // 2. Total calculation
    if (val === "=") {
      return onTotal();
    }

    // 3. Making the AC button functional
    if (val === "AC") {
      return setTextToDisplay("");
    }
    // 4. Making the C button functional
    if (val === "C") {
      const str = textToDisplay.slice(0, -1);
      return setTextToDisplay(str);
    }

    // 6. Not allowing to use an operator more than once
    if (operators.includes(val)) {
      const lastChar = textToDisplay.slice(-1);

      if (operators.includes(lastChar)) {
        const str = textToDisplay.slice(0, -1) + val;
        return setTextToDisplay(str);
      }
    }

    setTextToDisplay(textToDisplay + val);
  };

  // 2. Total calculation
  const onTotal = (str) => {
    // let str = textToDisplay;

    // 5. If the last character is an operator and we click "=", we slice the operator
    const lastChar = str.slice(-1);

    if (operators.includes(lastChar)) {
      str = str.slice(0, -1);
    }
    const ttl = eval(str);
    setTextToDisplay(ttl.toString());
  };

  return (
    <div>
      <div className="wrapper">
        <Title />
        <div className="mainParent">
          {/* <!-- Display Area --> */}
          {/* The line below textToDisplay={textToDisplay}, the LHS is the name/prop and the RHS is the value */}
          {/* The name which can be anything, then needs to be passed to the display function in display.js */}
          <Display textToDisplay={textToDisplay} />

          {/* <!-- Buttons Area --> */}
          {/* The line below click={handleOnClick}, the LHS is the name/prop and the RHS is the value */}
          {/* The name which can be anything, then needs to be passed to the buttons function in buttons.js */}
          <Buttons click={handleOnClick} />
        </div>
      </div>
    </div>
  );
};

export default App;
