import { useEffect, useState } from "react";

import { Results } from "./components/Results";
import countriesService from "./countriesService";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((response) => {
      setCountries(response);
    });
  }, []);
  return (
    <>
      <p>
        find countries{" "}
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </p>
      <Results
        search={search}
        show={(name) => setSearch(name.toLocaleLowerCase())}
        results={countries.filter((country) =>
          country.name.common.toLocaleLowerCase().includes(search)
        )}
      />
    </>
  );
}

export default App;
