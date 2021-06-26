import { useState, useEffect } from "react";

function AnswerChoice(props) {
  // Handles checking of answer is correct whwn button is clicked
  var [color, setColor] = useState("secondary");
  function handleClick(event) {
    if (props.checkAnswer(event)) {
      setColor("success");
    } else {
      setColor("danger");
    }
  }

  // Whenever any function in props.hooks is called, color is reset
  useEffect(() => {
    setColor("secondary");
  }, props.hooks);

  return (
    <button
      class={"btn btn-" + color + " btn-block"}
      onClick={handleClick}
      disabled={color !== "secondary"}
    >
      {props.choice}
    </button>
  );
}

export default AnswerChoice;
