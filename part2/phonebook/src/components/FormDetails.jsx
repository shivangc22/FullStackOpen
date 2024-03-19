// FormDetails.jsx
import phonebook from "../services/phonebook";
import { useState } from "react";

const FormDetails = ({ persons, setPersons, setNewSearch }) => {
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
                  const updatedEntry = await phonebook.updateEntry(existingPerson.id, newObject);
                  const updatedPersons = persons.map(person =>
                      person.id === updatedEntry.id ? updatedEntry : person
                  );
                  setPersons(updatedPersons);
                  setNewName('');
                  setNewNumber('');
                  setNewSearch('');
                  alert(`Successfully updated ${existingPerson.name} in the phonebook!`);
              } catch (error) {
                  console.error("Error updating person:", error.message);
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
          } catch (error) {
              console.error("Error adding new person:", error.message);
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
