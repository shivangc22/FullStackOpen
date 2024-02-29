const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return(
    <div>
      <Header course = {course} />
      <Content course = {course} />
      <Total course = {course} />
    </div>
  )
}

const Header = (props) => {
  return(
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return(
    <div>
      {props.course.parts.map((element, index) => (
        <Part key = {index} name = {element.name} exercises = {element.exercises} />
      ))}
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return <p>{props.name}: {props.exercises}</p>
}

const Total = (props) => {
  let sum = 0;
  props.course.parts.forEach(element => {
    sum += element.exercises;
  })
  return <p>Total number of exercises: {sum}</p>
}

export default App