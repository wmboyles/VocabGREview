import pickle
from dataclasses import dataclass
from random import randint, shuffle

import pandas as pd
import requests
from bs4 import BeautifulSoup


@dataclass
class DefinedWord:
    """
    A DefinedWord is an entry for a word in the dictionary, including the word's part of speech, definition, example sentence, and synonyms.
    If a word has multiple definitions, this object only represents one such definition.
    """
    
    word:str
    partOfSpeech:str
    definition:str
    example_sentence:str
    synonyms:list[str]


def define_word(word:str, language:str="en_US") -> list[DefinedWord]:
    """
    Given a word, call the dictionary API to get its dictionary entry.
    For each possible meaning of the word returned from the API, construct a DefinedWord object.
    Return all such object.
    """

    url = f"https://api.dictionaryapi.dev/api/v2/entries/{language}/{word}"

    try:
        res = requests.get(url).json()[0]
    except KeyError:
        # This should probably be done with actual logging
        print(f"WARNING: Could not properly define {word} in {language}")

        return []

    wordList = []
    meanings = res['meanings']

    for meaning in meanings:
        partOfSpeech = meaning['partOfSpeech']

        definitions = meaning['definitions']
        for definition in definitions:
            adefinition = definition['definition']
            example_sentence = definition.get('example', "")
            synonyms = definition.get('synonyms', [])

            defined_word = DefinedWord(word, partOfSpeech, adefinition, example_sentence, synonyms)
            wordList.append(defined_word)
    
    return wordList

def scrape_words(outpath:str="words.pkl") -> list[str]:
    """
    Scrape all the tables of GRE words on GraduateShotOnline.
    Return the words in all of these tables in a single list.
    """

    # Number of tables of words GraduateShotOnline has
    num_tables = 5

    words = []

    # For each table, scrape just the word column, we'll get nicer defintions from the API
    for table in range(1, num_tables + 1):
        url = f"https://www.graduateshotline.com/gre/load.php?file=list{table}.html"
        res = requests.get(url)

        soup = BeautifulSoup(res.text, 'html.parser')
        table_rows = soup.find('table').find_all('tr')
        
        for row in table_rows:
            word = row.find('td').find('a').text.lower()
            words.append(word.split()[0])

    picklefile = open(outpath, 'wb')
    pickle.dump(words, picklefile)

    return words

def compile_words(outpath:str="words_dataframe.pkl") -> pd.DataFrame:
    """
    Define all of the scraped words.
    Put them together into a pandas dataframe.
    """

    words = []
    for scraped_word in scrape_words():
        for defined_word in define_word(scraped_word):
            words.append(defined_word.__dict__)
    
    words = pd.DataFrame(words)

    picklefile = open(outpath, 'wb')
    pickle.dump(words, picklefile)

    return words

@dataclass
class Question:
    """
    A Question contains sentence with one word replaced with a blank and some answer choices.
    The correct answer choice is meant to fill in the blank and logically complete the sentence.
    """

    blank_sentence:str = ""
    choices:list[str] = None
    answer:str = ""

    def __repr__(self):
        """
        Prints a question and its choices out, like one might see on a test.
        Choices are shuffled, so printing the same question twice will likely have the answer choices in a different order.
        """

        shuffle(self.choices)

        parts = [f"{self.blank_sentence}\n"]
        parts += [f"{chr(i + ord('A'))}. {self.choices[i]}" for i in range(len(self.choices))]

        return '\n'.join(parts)


def random_question(num_options:int=5) -> Question:
    """
    Builds a Question where the correct answer is a random word.
    Picks num_options - 1 other words with the same part of speech as incorrect answer choices.
    """

    # Question object to return 
    question = Question()

    # Load in all the words
    words_df = pickle.load(open("words_dataframe.pkl", 'rb'))

    # Pick a random word to be the answer
    rand_word = words_df.loc[randint(0, len(words_df) - 1)]
    question.answer = rand_word['word']

    # Remove the answer from the example sentence
    question.blank_sentence = rand_word['example_sentence'].replace(question.answer, "__________")

    # Get all the other words with the same part of speech as the answer
    same_pos = words_df.query(f"partOfSpeech == '{rand_word['partOfSpeech']}' & word != '{rand_word['word']}'")

    # Generate num_options - 1 more incorrect answer choices
    question.choices = [same_pos.iloc[randint(0, len(same_pos) - 1)]['word'] for _ in range(1, num_options)]
    question.choices.append(question.answer)

    return question

question = random_question()
