import styled from 'styled-components';

// As we may want to render the LoadingSpinner in multiple locations it is
// declared in its own file which can be imported anywhere in the application
export const LoadingSpinner = styled.div`
  margin-top: -2.5rem;
  width: 150px;
  height: 150px;
  animation: spin 0.8s linear infinite;
  border-style: solid;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: red;
  border-left-color: red;
  border-width: 5px;
  border-radius: 50%;

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
