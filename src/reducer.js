export default function reducer(state, action) {
  switch (action.type) {
    case "CHARACTERS_LIST":
      return { ...state, charactersList: action.payload };
    case "FILTER_BY_NAME":
      const filterByName = state.charactersList.filter((el) =>
        el.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { ...state, filterByName };
    default:
      return state;
  }
}
