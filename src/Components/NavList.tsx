import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../actions/toggleSpan";

interface Props {
  text: string;
}

const NavList: React.FC<Props> = ({ text }) => {
  const dispath = useDispatch();
  const toggleState = useSelector(
    (state: { spanReducer: any }) => state.spanReducer
  );
  return (
    <li>
      <h2>{text}</h2>
      <div
        className={toggleState[text.toLowerCase()] ? "toggle on" : "toggle"}
        onClick={() => dispath(toggle(text.toLowerCase()))}
      >
        <div className="circle" />
      </div>
    </li>
  );
};

export default NavList;
