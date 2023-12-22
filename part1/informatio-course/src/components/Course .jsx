const Header = (props) => {
    return <h1>{props.course}</h1>;
  };
  
  const Part = ({ part, exercises }) => {
    return (
      <p>
        {part} {exercises}
      </p>
    );
  };
  
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map((part) => (
          <Part key={part.id} part={part.name} exercises={part.exercises}></Part>
        ))}
      </>
    );
  };
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, value) => sum + value.exercises, 0);
  
    return <b><p>Total of {total} exersices</p></b>;
  };

export const Course = ({ course }) => {
    return (
      <>
        <Header course={course.name}></Header>
        <Content parts={course.parts}></Content>
        <Total parts={course.parts}></Total>
      </>
    );
  };
