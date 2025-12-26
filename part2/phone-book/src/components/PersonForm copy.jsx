import { useState } from "react";

import personService from "../personService";

export const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const personExists = persons.some((person) => person.name === newName);
    console.log(personExists);

    if (personExists) {
      // update person?
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(personExists.id, { number: newNumber })
          .then((response) => {
            console.log(response);
          });
      } else {
        return;
      }
    } else {
      // create person
      personService
        .create({ name: newName, number: newNumber })
        .then((data) => setPersons([...persons, data]));
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <form>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
};
