import { useEffect, useState } from "react";
import AnswerChoice from "./AnswerChoice";

function Question() {
  // This might be kind of a hack, but it's the only way I found to prevent
  // "Cannot read property 'map' of undefined" when trying to do question.choices.map.
  const [question, setQuestion] = useState({
    blank_sentence: "",
    choices: [],
    answer: "",
  });

  // This handles an answer choice being clicked by returning if the choice was correct
  function handleClick(event) {
    return event.target.innerText == question.answer;
  }

  // This calls the API when the component loads and sets question data
  useEffect(() => {
    fetch("/question")
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <p class="lead">{question.blank_sentence}</p>
        <hr class="my-4" />
        <div class="container col-lg-10">
          {question.choices.map((c) => (
            <AnswerChoice key={c.id} choice={c} handleClick={handleClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Question;
