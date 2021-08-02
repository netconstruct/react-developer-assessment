import styled from 'styled-components'

const StyledButton = styled.button`
  border: 1px black solid;
  color: black;
  background-color: cyan;

  &:hover {
    background-color: white;
  }
`
function App() {
  return <div>
    <StyledButton onClick={()=>alert("test")}>test</StyledButton>
    err{/* Complete the exercise here. */}</div>;
}

export default App;
