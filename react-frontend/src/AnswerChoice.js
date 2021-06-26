import { useState } from "react";

function AnswerChoice(props) {
  // Handles checking of answer is correct whwn button is clicked
  var [correct, setCorrect] = useState(null);
  function handleClick(event) {
    setCorrect(props.handleClick(event));
  }

  // Sets button color based on correctness
  var btnColor;
  if (correct == null) {
    btnColor = "secondary";
  } else if (correct) {
    btnColor = "success";
  } else {
    btnColor = "danger";
  }

  return (
    <button
      class={"btn btn-" + btnColor + " btn-block"}
      onClick={handleClick}
      disabled={correct != null}
    >
      {props.choice}
    </button>
  );
}

export default AnswerChoice;
