const Course = (props) => {
    return(
        <div>
            <Header title = {props.course.name} />
            <Content sections = {props.course.parts} />
            <Total exercises = {props.course.parts} />
        </div>
    )
}

const Header = ({title}) => <h1>{title}</h1>

const Content = ({sections}) => {
    return(
        <div>
            {sections.map (element => <Part key = {element.id} name = {element.name} exercise = {element.exercises} /> )}
        </div>
    )
}

const Part = ({name, exercise}) => {
    return <p>{name}: {exercise}</p>
}

const Total = ({exercises}) => {
    const total = exercises.reduce((total, current) => total + current.exercises, 0)
    return <p><strong>Total of {total} exercises!</strong></p>
}

export default Course