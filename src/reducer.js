export default function reducer(state, action) {
  switch (action.type) {
    case "CHARACTERS_LIST":
      return { ...state, charactersList: action.payload };
    case "FILTER_BY_NAME":
      const filterByName = state.charactersList.filter((el) =>
        el.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { ...state, filterByName };
    case "FILTER_BY_STATUS":
      const filterByStatus = state.charactersList.filter((el) =>
        el.status.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { ...state, filterByStatus };
    case "FILTER_BY_GENRE":
      const filterByGenre = state.charactersList.filter((el) =>
        el.genre.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { ...state, filterByGenre };
    default:
      return state;
  }
}
