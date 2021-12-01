import { Props } from "../App";
import { useSelector } from "react-redux";

interface functionProps {
  onDelete: (name: string) => void;
  playAudio: (audio: string) => void;
}

const Word: React.FC<Props["word"] & functionProps> = ({
  name,
  type,
  definition,
  example,
  synonyms,
  audio,
  onDelete,
  playAudio,
}) => {
  const isSpanHidden = useSelector((state: any) => state.spanReducer);

  const formatSynonyms = (array: string[]) => {
    return array.map((synonym, index) => {
      if (index === array.length - 1) {
        return synonym;
      } else {
        return `${synonym}, `;
      }
    });
  };

  const formattedSynonyms = formatSynonyms(synonyms);

  return (
    <div className="word">
      <div className="row-1">
        <h1>{name}</h1>
        <i className="far fa-play-circle" onClick={() => playAudio(audio)} />
      </div>
      <div className="row-2">
        <p>
          <span className={isSpanHidden["type"] ? "type hidden" : "type"}>
            {type}
          </span>
        </p>
        <h2>
          Definition:{" "}
          <span
            className={
              isSpanHidden["definition"] ? "definition hidden" : "definition"
            }
          >
            {definition}
          </span>
        </h2>
        <h3>
          Example:{" "}
          <span
            className={isSpanHidden["example"] ? "example hidden" : "example"}
          >
            {example}
          </span>
        </h3>
        <h3>
          Synonyms:{" "}
          <span
            className={
              isSpanHidden["synonyms"] ? "synonyms hidden" : "synonyms"
            }
          >
            {formattedSynonyms}
          </span>
        </h3>
      </div>
      <i className="fas fa-times" onClick={() => onDelete(name)} />
    </div>
  );
};

export default Word;
