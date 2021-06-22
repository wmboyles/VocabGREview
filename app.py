import pickle
from random import randint, shuffle

import pandas as pd
from flask import Flask

from models import Question

app = Flask(__name__)

DEFINITIONS_FILEPATH = "words_dataframe.pkl"


@app.route("/define/<string:word>", methods=["GET"])
def define_word(word: str):
    """
    Given a word, looks up entries for it saved in DEFINITIONS_FILEPATH.
    """

    with open(DEFINITIONS_FILEPATH, "rb") as definitions_file:
        # Load in list of all definitions
        definitions: pd.DataFrame = pickle.load(definitions_file)

    # Query word to define it
    word_definition = definitions.query(f"word == '{word}'")

    # Return whatever the query yielded
    if word_definition.empty:
        return f"No definition found for {word}", 404

    return word_definition.to_json()


@app.route("/question/<string:answer>", methods=["GET"])
def make_question(answer: str, num_options: int = 5):
    """
    Make a question with a given word as the answer.
    """

    with open(DEFINITIONS_FILEPATH, "rb") as definitions_file:
        definitions: pd.DataFrame = pickle.load(definitions_file)

    try:
        answer_entry = definitions.query(f"word == '{answer}'").iloc[0]
    except IndexError:
        return f"No definition found for {answer}", 404

    blank_sentence = answer_entry["example_sentence"].replace(answer, "__________")

    # Words with the same part of speech as the answer
    same_pos = definitions.query(
        f"part_of_speech == '{answer_entry['part_of_speech']}' & word != '{answer}'"
    )

    # Get num_options - 1 incorrect answer choices with the same part of speech
    choices = [
        same_pos.iloc[randint(0, len(same_pos) - 1)]["word"]
        for _ in range(1, num_options)
    ]
    choices.append(answer)
    shuffle(choices)

    question = Question(blank_sentence, choices, answer)
    return question.__dict__


@app.route("/question", methods=["GET"])
def random_question(num_options: int = 5):
    """
    Make a question with a random word as the answer.
    """

    with open(DEFINITIONS_FILEPATH, "rb") as definitions_file:
        definitions: pd.DataFrame = pickle.load(definitions_file)

    rand_word = definitions.loc[randint(0, len(definitions) - 1)]

    return make_question(rand_word["word"], num_options)


app.run(debug=True)
