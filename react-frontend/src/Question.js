import { useEffect, useState } from "react";
import AnswerChoice from "./AnswerChoice";

function Question() {
  // This might be kind of a hack, but it's the only way I found to prevent
  // "Cannot read property 'map' of undefined" when trying to do data.choices.map.
  const [data, setData] = useState({
    blank_sentence: "",
    choices: [],
    answer: "",
  });

  useEffect(() => {
    fetch("/question")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <p class="lead">{data.blank_sentence}</p>
        <hr class="my-4" />
        <div class="container col-lg-10">
          {data.choices.map((c) => (
            <AnswerChoice key={c.id} choice={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Question;
