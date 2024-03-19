import { useState, useEffect } from 'react'
import phonebook from './services/phonebook'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const handleSearchFilter = (event) => setNewSearch(event.target.value.toLowerCase())

  useEffect(() => {
    phonebook
      .getAll()
      .then(initialEntries => {
        setPersons(initialEntries)
      })
  }, [])

  const filteredResults = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch) || person.number.includes(newSearch)) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch = {newSearch} handleSearchFilter = {handleSearchFilter} />
      <h2>Add a new entry</h2>
      <FormDetails persons = {persons} setPersons = {setPersons} />
      <h2>Numbers</h2>
      <ShowEntries filteredResults = {filteredResults} />
    </div>
  )
}

const Filter = ({newSearch, handleSearchFilter}) => {
  return(
    <p>
      Filter by: <input value = {newSearch} onChange = {handleSearchFilter} />
    </p>
  )
}

const FormDetails = ({persons, setPersons}) => {
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

const ShowEntries = ({filteredResults}) => <ol> { filteredResults.map(element => <li key = {element.id}><ShowData name = {element.name} number = {element.number} /></li>)} </ol>

const ShowData = ({name, number}) => <p>{name}: {number}</p>

export default App