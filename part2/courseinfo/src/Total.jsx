const Total = (props) => {
    return <b>total of {props.parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</b>
}

export default Total
