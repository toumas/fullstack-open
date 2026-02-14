const PersonForm = ({ handleOnSubmit, newName, handleNameOnChange, phoneNumber, handlePhoneNumberOnChange }) => {
    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNameOnChange} />
                </div>
                <div>
                    number: <input value={phoneNumber} onChange={handlePhoneNumberOnChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm
