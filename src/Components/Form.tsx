import React, { useRef } from "react";
import { Props as wordProp } from "../App";
import { v4 as uuidv4 } from "uuid";

interface Props {
  words: object[];
  setWords: React.Dispatch<React.SetStateAction<wordProp["word"][]>>;
}

const Form: React.FC<Props> = ({ words, setWords }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async () => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      inputRef.current.value = "";
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
      );

      if (response.ok) {
        const data = (await response.json())[0];
        const word: wordProp["word"] = {
          key: uuidv4(),
          name: data.word,
          audio: data.phonetics[0].audio,
          type: data.meanings[0].partOfSpeech,
          definition: data.meanings[0].definitions[0].definition,
          example: data.meanings[0].definitions[0].example,
          synonyms: data.meanings[0].definitions[0].synonyms.slice(0, 5),
        };

        const wordArray = words as wordProp["word"][];
        wordArray.unshift(word);
        setWords([...wordArray]);
        localStorage.setItem("learn-vocab-words", JSON.stringify(wordArray));
      } else {
        alert(
          "oof there is no such word. You might want to check your spelling 🤨"
        );
      }
    }
  };

  return (
    <div className="search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <input type="text" required ref={inputRef} />
        <div className="decoration"></div>
        <div className="inputText">Word...</div>
      </form>
      <i onClick={submitHandler} className="fas fa-search" />
    </div>
  );
};

export default Form;
