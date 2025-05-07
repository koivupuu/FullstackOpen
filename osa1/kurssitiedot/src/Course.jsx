const Header = ({ name }) => {
  return (
    <h2>
      {name}
    </h2>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />
      )}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

export default Course