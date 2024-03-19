import { useState, useEffect } from 'react';
import phonebook from './services/phonebook';
import Filter from './components/Filter';
import ShowData from './components/ShowData';
import FormDetails from './components/FormDetails';
import Error from './components/Error';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newSearch, setNewSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        phonebook
            .getAll()
            .then(initialEntries => setPersons(initialEntries))
            .catch(error => { 
                setErrorMessage(error.message)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
        }, []);

    const deleteEntry = async (id) => {
        try {
            const personToDelete = persons.find(person => person.id === id);
            if (!personToDelete) {
                setErrorMessage(`Person not found!`);
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }

            if (window.confirm(`Do you wish to delete ${personToDelete.name} from the phonebook?`)) {
                await phonebook.deleteEntry(id);
                setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
                setErrorMessage(`Successfully deleted ${personToDelete.name} from the phonebook!`);
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }
        } catch (error) {
            setErrorMessage(`Failed to delete ${personToDelete.name} from server!`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const filteredResults = persons.filter(person =>
        person.name.toLowerCase().includes(newSearch.toLowerCase()) ||
        person.number.includes(newSearch)
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Error message = {errorMessage} />
            <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
            <h2>Add a new entry</h2>
            <FormDetails persons={persons} setPersons={setPersons} setNewSearch={setNewSearch} setErrorMessage = {setErrorMessage} />
            <h2>Numbers</h2>
            <ShowData filteredResults={filteredResults} deleteEntry={deleteEntry} />
        </div>
    );
};

export default App;
