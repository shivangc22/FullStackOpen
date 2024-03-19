const Filter = ({newSearch, setNewSearch}) => {
    return(
      <p>
        Filter by: <input value = {newSearch} onChange = {(event) => setNewSearch(event.target.value)} />
      </p>
    )
}

export default Filter