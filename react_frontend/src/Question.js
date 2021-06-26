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
  function checkAnswer(event) {
    return event.target.innerText === question.answer;
  }

  // Calls API
  function loadQuestion() {
    fetch("/api/question")
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Calls API on component load
  useEffect(loadQuestion, []);

  return (
    <div>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <p class="lead">{question.blank_sentence}</p>
          <hr class="my-4" />
          <div class="container col-lg-10">
            {question.choices.map((c) => (
              <AnswerChoice
                key={c.id}
                choice={c}
                checkAnswer={checkAnswer}
                hooks={[loadQuestion]}
              />
            ))}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button class="btn btn-secondary btn-block" onClick={loadQuestion}>
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default Question;
