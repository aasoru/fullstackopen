import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import Select from "react-select";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries.js";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [selected, setSelected] = useState(null);
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data?.allAuthors || [];
  const options = authors.map((a) => ({ value: a.name, label: a.name }));

  const submit = (event) => {
    event.preventDefault();
    if (!selected) return;
    editAuthor({ variables: { name: selected.value, setBornTo: Number(born) } });
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select options={options} value={selected} onChange={setSelected} />
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
