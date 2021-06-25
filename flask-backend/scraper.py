import csv
import pickle

import pandas as pd
import requests
from bs4 import BeautifulSoup, Tag

from models import DefinedWord


def define_word(word: str, language: str = "en_US") -> list[DefinedWord]:
    """
    Given a word, call the dictionary API to get its dictionary entry.
    For each possible meaning of the word returned from the API, construct a DefinedWord object.
    Return all such object.
    """

    url = f"https://api.dictionaryapi.dev/api/v2/entries/{language}/{word}"

    try:
        res = requests.get(url).json()[0]
    except KeyError:
        # TODO: This should probably be done with actual logging
        print(f"WARNING: Could not properly define {word} in {language}")

        return []

    wordList: list[DefinedWord] = []
    meanings = res["meanings"]

    for meaning in meanings:
        part_of_speech = meaning["partOfSpeech"]

        definitions: list[dict] = meaning["definitions"]
        for definition in definitions:
            adefinition = definition["definition"]
            example_sentence = definition.get("example", "")
            synonyms = definition.get("synonyms", [])

            defined_word = DefinedWord(
                word, part_of_speech, adefinition, example_sentence, synonyms
            )
            wordList.append(defined_word)

    return wordList


def scrape_words(outpath: str = "words.csv"):
    """
    Scrape all the tables of GRE words on GraduateShotOnline.
    Return thewords in all these tables in a single list.
    Write the results to an output csv file.
    """

    # Number of tables of words GraduateShotOnline has
    num_tables = 5

    # CSV writing items
    outfile = open(outpath, "w", encoding="utf-8", newline="")
    writer = csv.writer(outfile)

    # Write the first row as column name
    writer.writerow(["word"])

    for table in range(1, num_tables + 1):
        url = f"https://www.graduateshotline.com/gre/load.php?file=list{table}.html"
        res = requests.get(url)

        soup = BeautifulSoup(res.text, "html.parser")
        table_rows: list[Tag] = soup.find("table").find_all("tr")

        for row in table_rows:
            word = row.find("td").find("a").text.split()[0].lower()
            writer.writerow([word])

    outfile.close()


def compile_words(
    wordspath: str = "words.csv", outpath: str = "words_dataframe.pkl"
) -> pd.DataFrame:
    """
    Define all words in the wordspath file.
    If the word is already defined in words_dataframe.pkl, we will not call the API again.
    All defined words are returned as a dataframe and serialized to words_dataframe.pkl.
    """

    # Open existing dataframe, if it exists
    try:
        with open(outpath, "rb") as existing_words_file:
            defined_words_df: pd.DataFrame = pickle.load(existing_words_file)
    except FileNotFoundError:
        defined_words_df = None

    # Open csv file of words as dataframe
    with open(wordspath) as wordsfile:
        wordlist_df: pd.DataFrame = pd.read_csv(wordsfile)

    # List of words that haven't been defined yet
    defined_wordlist = []

    for _, row in wordlist_df.iterrows():
        # If we've already defined the word, no need to do it again
        if (
            defined_words_df is not None
            and defined_words_df.query(f"word == '{row['word']}'").empty
        ):
            continue

        # Otherwise, define the word and append all its definitions
        for defined_word in define_word(row["word"]):
            defined_wordlist.append(defined_word.__dict__)

    # Dataframe of newly defined words
    # It's less expensive to create new dataframe and add everything at once
    newly_defined_word_df = pd.DataFrame(defined_wordlist)

    # Combine already defined and newly defined words
    if defined_words_df is None:
        defined_words_df = newly_defined_word_df
    else:
        defined_words_df = defined_words_df.append(newly_defined_word_df)

    # Serialize results
    with open(outpath, "wb") as picklefile:
        pickle.dump(defined_words_df, picklefile)

    return defined_words_df
