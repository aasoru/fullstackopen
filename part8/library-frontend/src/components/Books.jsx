import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const allBooksResult = useQuery(ALL_BOOKS);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  if (!props.show) {
    return null;
  }

  if (result.loading || allBooksResult.loading) {
    return <div>loading...</div>;
  }

  const filtered = result.data.allBooks;
  const genres = [...new Set(allBooksResult.data.allBooks.flatMap((b) => b.genres))];

  return (
    <div>
      <h2>books</h2>

      {genre && <p>in genre <strong>{genre}</strong></p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filtered.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            style={{ fontWeight: genre === g ? "bold" : "normal" }}
          >
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
