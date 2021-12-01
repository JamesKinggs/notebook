const prevSettings = JSON.parse(localStorage.getItem("previous-settings"));

const nightThemeReducer = (state = prevSettings["night"], { type }) => {
  const updatedSettings = JSON.parse(localStorage.getItem("previous-settings"));
  switch (type) {
    case "TOGGLE":
      localStorage.setItem(
        "previous-settings",
        JSON.stringify({ ...updatedSettings, night: !state })
      );
      return !state;
    default:
      return state;
  }
};

export default nightThemeReducer;
