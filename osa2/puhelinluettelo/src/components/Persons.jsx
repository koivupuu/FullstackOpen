import personService from '../services/persons'

const Person = ({ setPersons, persons, name, number, id }) => {

  const handlePersonDelete = () => {
    window.confirm(`Delete ${name}?`)
    ? personService.remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
    : console.log("cancelled");
  }

  return (
    <div>
      {name} {number} <button onClick={handlePersonDelete}>delete</button>
    </div>
  );
};

export const Persons = ({ setPersons, persons, filter }) => {
  return (
    <div>
      {persons
        .filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => <Person setPersons={setPersons} persons={persons} key={person.id} name={person.name} number={person.number} id={person.id} />
        )}
    </div>
  );
};
