import phonebook from "../services/phonebook"
import { useState } from "react"

const FormDetails = ({persons, setPersons, setNewSearch}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const handleNewName = (event) => setNewName(event.target.value)
    const handleNewNumber = (event) => setNewNumber(event.target.value)
  
    const addNewEntry = (event) => {
      event.preventDefault();
      if (persons.some(obj => obj.name === newName || obj.number === newNumber)) {
        const existingEntry = persons.find(person => person.name === newName || person.number === newNumber);
        if (existingEntry.name === newName) {
          alert(`${newName} is already added to the phonebook, with the number ${existingEntry.number}`);
        } else {
          alert(`${newNumber} is already added to the phonebook, with the name ${existingEntry.name}`);
        }
      } else {
        const newObject = { name: newName, number: newNumber };
        phonebook
          .create(newObject)
          .then(returnedEntry => {
            setPersons(persons.concat(returnedEntry));
            setNewName('');
            setNewNumber('');
            setNewSearch('');
          })
      }
    };
    return(
      <form onSubmit = {addNewEntry}>
        <div>
          <p>name: <input value = {newName} onChange = {handleNewName}/></p>
          <p>number: <input value = {newNumber} onChange = {handleNewNumber}/></p>
        </div>
        <div>
          <br /><button type="submit">add</button>
        </div>
      </form>
    )
}

export default FormDetails