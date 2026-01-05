import { useState, useEffect } from "react";

import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import { Notification } from "./components/Notification";

import personService from "./personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const filteredList =
    filter.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
      : persons;

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const createNotification = (type, message) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    if (type === "success") {
      setSuccessMessage(message);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } else if (type === "error") {
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const personExists = persons.find((person) => person.name === newName);

    if (personExists) {
      // update person?
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(personExists.id, { number: newNumber, name: newName })
          .then((response) => {
            const newPersonsArray = persons.map((person) => {
              return person.id === response.id ? response : person;
            });
            setPersons(newPersonsArray);
          });
      } else {
        return;
      }
    } else {
      // create person
      personService
        .create({ name: newName, number: newNumber })
        .then((data) => {
          setPersons([...persons, data]);
          createNotification("success", `Added ${newName}`);
        })
        .catch((error) => {
          createNotification("error", error.response.data.error);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const remove = ({ person }) => {
    const { id, name } = person;
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== response.id));
        })
        .catch((error) => {
          createNotification(
            "error",
            `Information of ${name} has already been removed from server`
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type="success" message={successMessage} />
      <Notification type="error" message={errorMessage} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new person</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredList} remove={remove} />
    </div>
  );
};

export default App;
