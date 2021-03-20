import React from "react";
import Layout from "./components/layout/index";
import CharactersList from "./characters-list";
import { Provider } from "react-redux";
import reducer from "./reducer";
import { createStore } from "redux";

const initialState = {
  charactersList: [],
};
const store = createStore(reducer, initialState);

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <CharactersList />
      </Layout>
    </Provider>
  );
}

export default App;
