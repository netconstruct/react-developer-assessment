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

export const StyledNavigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const StyledNavigationItem = styled(Link)<{$selected: boolean}>`
  text-decoration: none;
  min-width: 80px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &:hover{
    background-color: #e4e4e4;
  }
  padding: 2px 4px;
  border-radius: 2px;

  ${p => css`
  ${p.$selected && `
  border-bottom: 2px solid blue;
  `}
  ${!p.$selected && `padding-bottom: 4px;`}
`}
`