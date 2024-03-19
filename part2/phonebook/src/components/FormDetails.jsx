// FormDetails.jsx
import phonebook from "../services/phonebook";
import { useState } from "react";

const FormDetails = ({ persons, setPersons, setNewSearch, setErrorMessage }) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleNewName = (event) => setNewName(event.target.value);
    const handleNewNumber = (event) => setNewNumber(event.target.value);

    const addNewEntry = async (event) => {
      event.preventDefault();
      const existingPerson = persons.find(person => person.name === newName || person.number === newNumber);
  
      if (existingPerson) {
          const confirmMessage = `${existingPerson.name} is already added to the phonebook, with ${existingPerson.number}, overwrite?`;
          if (window.confirm(confirmMessage)) {
              const newObject = { name: newName, number: newNumber };
              try {
                  const updatedEntry = await phonebook.updateEntry(existingPerson.id, newObject)
                  const updatedPersons = persons.map(person =>
                      person.id === updatedEntry.id ? updatedEntry : person
                  );
                  setPersons(updatedPersons);
                  setNewName('');
                  setNewNumber('');
                  setNewSearch('');
                  setErrorMessage(`Successfully updated ${existingPerson.name} in the phonebook!`)
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
              } catch (error) {
                setErrorMessage(`Failed to update ${existingPerson.name}!`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
              }
          }
      } else {
          const newObject = { name: newName, number: newNumber };
          try {
              const returnedEntry = await phonebook.create(newObject);
              setPersons([...persons, returnedEntry]);
              setNewName('');
              setNewNumber('');
              setNewSearch('');
              setErrorMessage(`Successfully added ${newName} to the phonebook!`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
          } catch (error) {
            setErrorMessage(`Failed to add ${newName}!`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
          }
      }
  };
  

    return (
        <form onSubmit={addNewEntry}>
            <div>
                <p>name: <input value={newName} onChange={handleNewName} /></p>
                <p>number: <input value={newNumber} onChange={handleNewNumber} /></p>
            </div>
            <div>
                <br /><button type="submit">add</button>
            </div>
        </form>
    );
};

export default FormDetails;
