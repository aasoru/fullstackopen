import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = (props) => {
  const booksResult = useQuery(ALL_BOOKS);
  const meResult = useQuery(ME);

  if (!props.show) {
    return null;
  }

  if (booksResult.loading || meResult.loading) {
    return <div>loading...</div>;
  }

  const favoriteGenre = meResult.data.me.favoriteGenre;
  const books = booksResult.data.allBooks.filter((b) =>
    b.genres.includes(favoriteGenre),
  );

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
