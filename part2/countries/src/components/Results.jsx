import { Country } from "./Country";

export const Results = ({ search, results, show }) => {
  if (results.length === 0 || search.length === 0)
    return <p>No matches, specifiy another filter</p>;

  if (results.length > 10)
    return <p>Too many matches, specifiy another filter</p>;

  if (results.length === 1) {
    return <Country country={results[0]} />;
  }

  return (
    <ul>
      {results.map((country) => {
        return (
          <li key={country.cca2}>
            {country.name.common}{" "}
            <button onClick={() => show(country.name.common)}>Show</button>
          </li>
        );
      })}
    </ul>
  );
};
