import Question from "./Question";

function Main() {
  return (
    <main class="container col-lg-8 my-5 py-5">
      <Question />
      <div class="row">
        <div class="col">
          <button class="btn btn-secondary btn-block" ng-click="getQuestion()">
            Next Question
          </button>
        </div>
      </div>
    </main>
  );
}

export default Main;
