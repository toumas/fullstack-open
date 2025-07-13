import Part from './Part'

const Content = (props) => {
    return props.parts.map((part) => {
        return <Part key={part.name} {...part} />
    })
}

export default Content
