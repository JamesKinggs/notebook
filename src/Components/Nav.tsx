import React from "react";
import NavList from "./NavList";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNight } from "../actions/toggleNight";

interface ToggleProps {
  deleteAll: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Nav = (props: ToggleProps): JSX.Element => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const dispatch = useDispatch();
  const nightTheme = useSelector((state: any) => state.nightReducer);

  const toggleNav = (): void => {
    setNavIsOpen(!navIsOpen);
  };

  window.addEventListener("click", (e) => {
    if (e.clientX < window.innerWidth / 2) {
      setNavIsOpen(false);
    }
  });

  return (
    <nav className={navIsOpen ? "active" : ""}>
      <div className="contain">
        <h1>MyNoteBook</h1>
        <i className="fas fa-book" />
      </div>
      <div className="cog">
        <i className="fas fa-cog" onClick={toggleNav} />
      </div>
      <ul>
        <li className="row">
          <i className="far fa-sun" />
          <div
            className={nightTheme ? "toggle on" : "toggle"}
            onClick={() => dispatch(toggleNight())}
          >
            <div className="circle" />
          </div>
          <i className="fas fa-moon" />
        </li>
        <NavList text="Type" />
        <NavList text="Definition" />
        <NavList text="Example" />
        <NavList text="Synonyms" />
        <button className="delete-all" onClick={props.deleteAll}>
          Delete All
        </button>
      </ul>
    </nav>
  );
};

export default Nav;
