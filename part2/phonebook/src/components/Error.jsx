const Error = ({ message }) => {
    if (message === null) {
        return null;
    } else {
        const isError = message.toLowerCase().includes('failed');
        return (
            <h2 className={`error ${isError ? 'error-failed' : ''}`}>
                {message}
            </h2>
        );
    }
};

export default Error;
