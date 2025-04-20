const Header = (course) => {
  return (
    <h1>
      {course.course.name}
    </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.content.parts[0]}/>
      <Part part={props.content.parts[1]} />
      <Part part={props.content.parts[2]} />
    </div>
  )
}

const Part = (part) => {
  return (
    <p>
      {part.part.name} {part.part.exercises}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}
    </p>
  )
}

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

  return (
    <div>
      <Header course={course} />
      <Content content={course} />
      <Total parts={course}/>
    </div>
  )
}

export default App