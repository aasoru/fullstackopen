import { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client/react";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("library-app-user"));
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((b) => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} updateCacheWith={updateCacheWith} />
      <Recommend show={page === "recommend"} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={notify}
      />
    </div>
  );
};

export default App;
