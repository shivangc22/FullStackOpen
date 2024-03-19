
const ShowData = ({ filteredResults, deleteEntry }) => {
    let serialNumber = 0;

    return (
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
            <thead>
                <tr>
                    <td style={{ border: '1px solid black', padding: '4px' }}>S. No.</td>
                    <td style={{ border: '1px solid black', padding: '4px' }}>Name</td>
                    <td style={{ border: '1px solid black', padding: '4px' }}>Number</td>
                    <td style={{ border: '1px solid black', padding: '4px' }}>Delete</td>
                </tr>
            </thead>
            <tbody>
                {filteredResults.map(element => {
                    serialNumber++;
                    return(
                    <tr key={element.id}>
                        <td style={{ border: '1px solid black', padding: '4px' }}>{serialNumber}</td>
                        <td style={{ border: '1px solid black', padding: '4px' }}>{element.name}</td>
                        <td style={{ border: '1px solid black', padding: '4px' }}>{element.number}</td>
                        <td style={{ border: '1px solid black', padding: '4px' }}>
                            <button type = "button" onClick = {() => deleteEntry(element.id)}>Delete</button>
                        </td>
                    </tr>
                )})}
            </tbody>
        </table>
    );
}

export default ShowData;
