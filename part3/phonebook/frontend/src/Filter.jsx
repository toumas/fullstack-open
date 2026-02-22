const Filter = ({query, handleQueryOnChange}) => {
    return (
        <>
          <input value={query} onChange={handleQueryOnChange} />
        </>
    )
}

export default Filter
