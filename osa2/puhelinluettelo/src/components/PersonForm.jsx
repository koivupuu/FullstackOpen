import { useState } from 'react';
import personService from '../services/persons'

export const PersonForm = ({ persons, setPersons, setError, setMessage }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };

    const person = persons.find(({ name }) => name === newName)

    person
      ? window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        ? personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setMessage(`Number of ${personObject.name} changed`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.map(person => person.name === newName ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setError(
              `Information on ${person.name} has already been removed from server`
            )
            console.log(error);
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
        : console.log("cancelled")

      : personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
