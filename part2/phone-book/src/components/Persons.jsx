export const Persons = ({ persons = [], remove }) => {
  return (
    <>
      {persons.map((person, index) => (
        <div key={index}>
          {person.name} {person.number}{" "}
          <button onClick={() => remove({ person })}>delete</button>
        </div>
      ))}
    </>
  );
};
