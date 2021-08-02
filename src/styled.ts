import styled, {css} from 'styled-components';
import { Link } from "react-router-dom";

export const StyledButton = styled.button`
  border: 1px black solid;
  color: black;
  background-color: cyan;

  &:hover {
    background-color: white;
  }
`;

export const StyledNavigation = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;  
`;

export const StyledNavigationItem = styled(Link)<{$selected: boolean}>`
  text-decoration: none;
  ${p => css`
    ${p.$selected && `border-bottom: 1px solid blue;`}
    
  `}
`