const prevSettings = JSON.parse(localStorage.getItem("previous-settings"));

const toggleSpanReducer = (
  state = {
    type: prevSettings["type"],
    definition: prevSettings["definition"],
    example: prevSettings["example"],
    synonyms: prevSettings["synonyms"],
  },
  { type, payload }
) => {
  const updatedSettings = JSON.parse(localStorage.getItem("previous-settings"));
  switch (type) {
    case "TOGGLE_SPAN":
      switch (payload) {
        case "type":
          localStorage.setItem(
            "previous-settings",
            JSON.stringify({ ...updatedSettings, type: !state.type })
          );
          return { ...state, type: !state.type };
        case "definition":
          localStorage.setItem(
            "previous-settings",
            JSON.stringify({
              ...updatedSettings,
              definition: !state.definition,
            })
          );
          return { ...state, definition: !state.definition };
        case "example":
          localStorage.setItem(
            "previous-settings",
            JSON.stringify({ ...updatedSettings, example: !state.example })
          );
          return { ...state, example: !state.example };
        case "synonyms":
          localStorage.setItem(
            "previous-settings",
            JSON.stringify({ ...updatedSettings, synonyms: !state.synonyms })
          );
          return { ...state, synonyms: !state.synonyms };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default toggleSpanReducer;
