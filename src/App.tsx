import Form from "./Components/Form";
import Nav from "./Components/Nav";
import Word from "./Components/Word";
import "./styles/App.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export interface Props {
  word: {
    key: string;
    name: string;
    audio: string;
    type: string;
    definition: string;
    example: string;
    synonyms: any;
  };
}

if (!localStorage.getItem("previous-settings")) {
  localStorage.setItem(
    "previous-settings",
    JSON.stringify({
      type: false,
      definition: true,
      example: false,
      synonyms: false,
      night: true,
    })
  );
}

function App() {
  const [words, setWords] = useState<Props["word"][]>([]);
  const nightTheme = useSelector((state: any) => state.nightReducer);

  useEffect(() => {
    const data = localStorage.getItem("learn-vocab-words");
    if (data) {
      const array: any = JSON.parse(data);
      setWords(array);
    }
  }, []);

  const onDelete = (name: string): void => {
    const newWords = words.filter((word: Props["word"]) => word.name !== name);
    setWords(newWords);
    localStorage.setItem("learn-vocab-words", JSON.stringify(newWords));
  };

  const playAudio = (audio: string): void => {
    if (audio) {
      const sound = new Audio(audio);
      sound.play();
    } else {
      alert("Sorry this word does not have an audio track 😕");
    }
  };

  const deleteAll = () => {
    setWords([]);
  };

  return (
    <div className={nightTheme ? "App" : "App light"}>
      <Nav deleteAll={deleteAll} />
      <Form words={words} setWords={setWords} />
      {words.length >= 1 ? (
        <main>
          {words.map((word: Props["word"]) => {
            return (
              <Word
                onDelete={onDelete}
                playAudio={playAudio}
                key={word.key}
                audio={word.audio}
                name={word.name}
                type={word.type}
                definition={word.definition}
                example={word.example}
                synonyms={word.synonyms}
              />
            );
          })}
        </main>
      ) : (
        <h1>No word yet? Start adding one...</h1>
      )}
    </div>
  );
}

export default App;
