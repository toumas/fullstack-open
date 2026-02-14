const Persons = ({ persons, query, onDelete }) => {
    return (
        <>
            {persons
                .filter((p) => {
                    return p.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                })
                .map(p => (
                    <div key={p.id}>
                        {p.name} {p.number}
                        <button onClick={() => {onDelete(p)}}>delete</button>
                    </div>
                ))}
        </>
    )
}

export default Persons
