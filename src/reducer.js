export default function reducer(state, action) {
  switch (action.type) {
    case "CHARACTERS_LIST":
      return { ...state, charactersList: action.payload };

    default:
      return state;
  }
}
