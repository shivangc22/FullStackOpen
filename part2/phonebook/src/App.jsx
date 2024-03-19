import { useState, useEffect } from 'react';
import phonebook from './services/phonebook';
import Filter from './components/Filter';
import ShowData from './components/ShowData';
import FormDetails from './components/FormDetails';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newSearch, setNewSearch] = useState('');

    useEffect(() => {
        phonebook
            .getAll()
            .then(initialEntries => setPersons(initialEntries))
            .catch(error => console.error("Error fetching initial data:", error));
    }, []);

    const deleteEntry = async (id) => {
        try {
            const personToDelete = persons.find(person => person.id === id);
            if (!personToDelete) {
                throw new Error("Person not found");
            }

            if (window.confirm(`Do you wish to delete ${personToDelete.name} from the phonebook?`)) {
                await phonebook.deleteEntry(id);
                setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
                alert(`Successfully deleted ${personToDelete.name} from the phonebook!`);
            }
        } catch (error) {
            console.error("Error deleting person:", error.message);
        }
    };

    const filteredResults = persons.filter(person =>
        person.name.toLowerCase().includes(newSearch.toLowerCase()) ||
        person.number.includes(newSearch)
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
            <h2>Add a new entry</h2>
            <FormDetails persons={persons} setPersons={setPersons} setNewSearch={setNewSearch} />
            <h2>Numbers</h2>
            <ShowData filteredResults={filteredResults} deleteEntry={deleteEntry} />
        </div>
    );
};

export default App;
