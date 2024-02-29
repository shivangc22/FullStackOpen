import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([ { name: 'Arto Hellas' } ]) 
  const [newName, setNewName] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName.trim())) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const newNameObject = { name: newName }
      setPersons(persons.concat(newNameObject))
      setNewName('')
      }
    }

  const handleNewName = (event) => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addNewName}>
        <div>
          name: <input value = {newName} onChange = {handleNewName}/>
        </div>
        <div>
          <br /><button type="submit">add</button>
        </div>
      </form>
      <h2>Names</h2>
      <StoredNames persons = {persons} />
      <h2>Numbers</h2>
      ...
    </div>
  )
}

const StoredNames = ({persons}) => {
  return(
    <div>
      { persons.map(element => 
      <ShowData key = {element.name} value = {element.name} />
      )}
    </div>
  )
}

const ShowData = ({value}) => <p>{value}</p>
export default App