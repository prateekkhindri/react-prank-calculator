import { useState } from "react";
import "./App.css";
import { Buttons } from "./components/Buttons";
import { Display } from "./components/Display";
import { Title } from "./components/Title";

const operators = ["+", "-", "/", "*"];

const App = () => {
  const [textToDisplay, setTextToDisplay] = useState("");

  const handleOnClick = (val) => {
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
  const onTotal = () => {
    let str = textToDisplay;

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
