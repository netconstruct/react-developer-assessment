import React from 'react'
import styled from 'styled-components'

function NavBar() {
 
  
  return (
    <Nav>
      <h1>NetConstruct</h1>
      <nav>
        <span></span>
        <span></span>
        <span></span>
      </nav>
    </Nav>
  )
}

const Nav = styled.header`
position: fixed;
width: 100%;
height: 112px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 30px;
background-color: #FFFFFF;
z-index: 100;
box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);

@media only screen and (max-width: 768px) {
  padding: 0 10px;
  h1 {
    font-size: 16px;
  }
}

nav {
  height: 24px;
  width: 34px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;

  &:hover span:nth-child(3) {
    width: 100%;
  }

  span {
    width: 100%;
    height: 4px;
    background-color: #000000;
    transition: all 0.3s ease;
    border-radius: 2px;

    &:nth-child(3) {
      width: 22px;
    }
  }

}
`;

export default NavBar
