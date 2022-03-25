import React from "react";

export const Display = ({ textToDisplay }) => {
  return (
    <div className="result" id="result">
      {textToDisplay || "0.00"}
    </div>
  );
};
