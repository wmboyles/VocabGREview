from dataclasses import dataclass


@dataclass
class DefinedWord:
    """
    A DefinedWord is an entry for a word in the dictionary, including the word's part of speech, definition, example sentence, and synonyms.
    If a word has multiple definitions, this object only represents one such definition.
    """

    word: str
    part_of_speech: str
    definition: str
    example_sentence: str
    synonyms: list[str]


@dataclass
class Question:
    """
    A Question contains sentence with one word replaced with a blank and some answer choices.
    The correct answer choice is meant to fill in the blank and logically complete the sentence.
    """

    blank_sentence: str
    choices: list[str]
    answer: str

    def __repr__(self):
        """
        Prints a question and its choices out, like one might see on a test.
        """

        parts = [f"{self.blank_sentence}\n"]
        parts += [
            f"{chr(i + ord('A'))}. {self.choices[i]}" for i in range(len(self.choices))
        ]

        return "\n".join(parts)
